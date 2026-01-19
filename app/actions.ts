"use server";

import nodemailer from "nodemailer";
import { siteData } from "@/lib/data";

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "All fields are required" };
  }

  // Create a transporter using your email provider
  // For now, we'll log it as we don't have SMTP credentials, 
  // but this sets up the structure real structure.
  // In production, you would use process.env.SMTP_...
  
  /*
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  */

  // Mock sending for demonstration without crasing
  console.log(`Sending email from ${email} (${name}): ${message}`);
  
  // To simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true };
}
