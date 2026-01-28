import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Use Inter as planned
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elevare Advisory | Complex Deal Management",
  description: "Helping organisations structure, execute, and stabilise complex deals — from pursuit to delivery.",
};

import { getSiteData } from "@/lib/fetch-data";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteData = await getSiteData();
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} antialiased selection:bg-secondary selection:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
           <Footer data={siteData.footer} />
        </ThemeProvider>
      </body>
    </html>
  );
}
