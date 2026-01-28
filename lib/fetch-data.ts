import Papa from "papaparse";
import { siteData as defaultData } from "./data";

const SHEET_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;

export type SiteData = typeof defaultData;

interface CsvRow {
  section: string;
  id: string;
  field: string;
  value: string;
}

export async function getSiteData(): Promise<SiteData> {
  if (!SHEET_URL) {
    console.warn("NEXT_PUBLIC_GOOGLE_SHEET_URL is not defined. Using default data.");
    return defaultData;
  }

  try {
    const response = await fetch(SHEET_URL, { next: { revalidate: 60 } });
    const csvText = await response.text();

    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          const rows = results.data as CsvRow[];
          const data = transformCsvToData(rows);
          resolve(data);
        },
        error: (error: any) => {
          console.error("Error parsing CSV:", error);
          resolve(defaultData);
        },
      });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return defaultData;
  }
}

function transformCsvToData(rows: CsvRow[]): SiteData {
  const data: any = {
    hero: {},
    about: {},
    services: [],
    footer: {},
  };

  const servicesMap: Record<string, any> = {};

  rows.forEach((row) => {
    if (!row.section || !row.field) return;

    // Handle Hero
    if (row.section === "hero") {
      data.hero[row.field] = row.value;
    }

    // Handle About
    if (row.section === "about") {
      data.about[row.field] = row.value;
    }

    // Handle Footer
    if (row.section === "footer") {
      data.footer[row.field] = row.value;
    }

    // Handle Services
    if (row.section === "services" && row.id) {
      if (!servicesMap[row.id]) {
        servicesMap[row.id] = { id: row.id };
      }
      
      const value = row.value;
      
      // Handle arrays (split by newlines for lists)
      if (["whatIDo", "typicalSituations"].includes(row.field)) {
         servicesMap[row.id][row.field] = value.split("\n").filter(line => line.trim() !== "");
      } else {
         servicesMap[row.id][row.field] = value;
      }
    }
  });

  data.services = Object.values(servicesMap);
  
  // Merge with default data to ensure structure/types safety if CSV is partial
  // This is a deep merge simplification
  return { ...defaultData, ...data, services: data.services.length > 0 ? data.services : defaultData.services };
}
