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
    if (!response.ok) {
      console.error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
      return defaultData;
    }
    const csvText = await response.text();
    
    // Find the start of the actual data (skip empty rows often found in Google Sheets exports)
    // We look for the header row "section,id,field,value"
    const headerRow = "section,id,field,value";
    const headerIndex = csvText.indexOf(headerRow);
    
    const cleanCsvText = headerIndex !== -1 ? csvText.substring(headerIndex) : csvText;

    return new Promise((resolve) => {
      Papa.parse(cleanCsvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const rows = results.data as CsvRow[];
          const data = transformCsvToData(rows);
          // console.log("Transformed services count:", data.services.length);
          if (data.services.length === 0) {
            console.warn("No services found in CSV data. Using default services.");
          }
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
