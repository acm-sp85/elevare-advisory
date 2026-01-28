import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

interface FooterProps {
  data: {
    phone: string;
    email: string;
    locations: string;
    copyright: string;
  };
}

export function Footer({ data }: FooterProps) {
  const { phone, email, locations, copyright } = data;

  return (
    <footer className="bg-footer text-footer-foreground pt-16 pb-8" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Elevare<span className="font-light opacity-80">Advisory</span></h3>
            <p className="text-primary-foreground/70 max-w-xs">
              Making complex deals work through structured execution and strategic alignment.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-secondary transition-colors">Home</Link></li>
              <li><Link href="/#about" className="hover:text-secondary transition-colors">About</Link></li>
              <li><Link href="/#services" className="hover:text-secondary transition-colors">Services</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-secondary" />
                <span>{phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-secondary" />
                <a href={`mailto:${email}`} className="hover:underline">{email}</a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                <span>{locations}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/60">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
