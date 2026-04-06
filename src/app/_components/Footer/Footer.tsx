import React from 'react';
import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  LucideIcon
} from 'lucide-react';

export default function Footer() {

  const socialLinks: { icon: LucideIcon; href: string }[] = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Youtube, href: "#" },
  ];

  const quickLinks = ['About Us', 'Shop', 'Categories', 'Contact', 'Blog'];
  const customerLinks = ['Track Order', 'Returns', 'Shipping', 'Help Center', 'Terms'];

  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-10">

      <div className="container mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-[#50829F]">ElleStore</h2>
          <p className="text-slate-500 leading-relaxed">
            Discover quality products across multiple categories — all in one place.
          </p>

          <div className="flex gap-3">
            {socialLinks.map((item, index) => {
              const Icon = item.icon;

              return (
                <Link
                  key={index}
                  href={item.href}
                  className="group w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 transition-all duration-300 hover:bg-[#50829F] hover:text-white hover:border-[#50829F]"
                >
                  <Icon
                    size={18}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-slate-900 font-bold mb-6 text-lg">Quick Links</h4>
          <ul className="space-y-4">
            {quickLinks.map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-slate-500 hover:text-[#50829F] transition-all flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-[#50829F] group-hover:w-3 transition-all"></span>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-slate-900 font-bold mb-6 text-lg">Customer Service</h4>
          <ul className="space-y-4">
            {customerLinks.map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-slate-500 hover:text-[#50829F] transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-slate-900 font-bold mb-6 text-lg">Contact</h4>
          <div className="space-y-5">

            <div className="flex items-start gap-4">
              <MapPin className="text-[#50829F] mt-1" size={20} />
              <p className="text-slate-500">Cairo, Egypt</p>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-[#50829F]" size={20} />
              <p className="text-slate-500">+20 123 456 789</p>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="text-[#50829F]" size={20} />
              <p className="text-slate-500">support@ellestore.com</p>
            </div>

          </div>
        </div>

      </div>

      <div className="border-t border-slate-200 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm text-center md:text-left">
            © 2026 ElleStore. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  );
}