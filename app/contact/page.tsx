"use client";

import { useState } from "react";
import { sendEmail } from "@/app/actions";
import { siteData } from "@/lib/data";
import { Mail, Phone, MapPin, Loader2, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError("");
    setSuccess(false);

    try {
      const result = await sendEmail(formData);
      if (result.success) {
        setSuccess(true);
        // Reset form
        const form = document.querySelector("form") as HTMLFormElement;
        form?.reset();
      } else {
        setError(result.error || "Something went wrong.");
      }
    } catch (e) {
      setError("Failed to send message.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground text-center">Contact Us</h1>
        <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Ready to structure your complex deals? Get in touch with us today.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8 bg-muted/30 p-8 rounded-3xl h-fit">
            <h2 className="text-2xl font-semibold mb-6">Get in touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium text-foreground">Email</h3>
                  <a href={`mailto:${siteData.footer.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {siteData.footer.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium text-foreground">Phone</h3>
                  <p className="text-muted-foreground">{siteData.footer.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium text-foreground">Locations</h3>
                  <p className="text-muted-foreground">{siteData.footer.locations}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card border border-border/50 p-8 rounded-3xl shadow-sm">
            <form action={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              {error && (
                <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-4 rounded-lg bg-green-50 text-green-600 text-sm flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Message sent successfully!
                </div>
              )}

              <button
                type="submit"
                disabled={pending}
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {pending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
