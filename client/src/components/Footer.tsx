import Link from "next/link";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-blue-500 fill-current" />
              <span className="text-2xl font-bold">ArogyaShayak</span>
            </div>
            <p className="text-gray-400 text-sm">
              Making healthcare accessible, affordable, and transparent for everyone. Your trusted companion in the medical journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/hospitals" className="text-gray-400 hover:text-white transition-colors">Find Hospitals</Link></li>
              <li><Link href="/schemes" className="text-gray-400 hover:text-white transition-colors">Ayushman Bharat</Link></li>
              <li><Link href="/stays" className="text-gray-400 hover:text-white transition-colors">Affordable Stays</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+91 1800-123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>support@arogyashayak.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} ArogyaShayak. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
