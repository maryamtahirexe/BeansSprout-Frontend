import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-lilac/30 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌸</span>
              <span className="font-display text-xl text-purple-800">BeansSprout</span>
            </div>
            <p className="font-body text-sm text-purple-500 leading-relaxed">
              Where every cup is a little moment of joy. Crafted with love, served with a smile.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-purple-800 mb-3 tracking-wide uppercase">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              {[['/', 'Home'], ['/menu', 'Menu'], ['/about', 'About'], ['/my-orders', 'My Orders']].map(([to, label]) => (
                <Link key={to} to={to} className="font-body text-sm text-purple-500 hover:text-purple-700 transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold text-purple-800 mb-3 tracking-wide uppercase">
              Say Hello
            </h4>
            <div className="flex flex-col gap-2 font-body text-sm text-purple-500">
              <span>📍 123 Blossom Lane, Café District</span>
              <span>📞 +1 (555) 123-4567</span>
              <span>✉️ hello@beanssprout.com</span>
              <div className="flex gap-3 mt-2">
                <span className="cursor-pointer hover:text-purple-700 transition-colors text-lg">📷</span>
                <span className="cursor-pointer hover:text-purple-700 transition-colors text-lg">🐦</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-lilac/30 pt-6 text-center">
          <p className="font-body text-xs text-purple-400">
            © {new Date().getFullYear()} BeansSprout · Made with 🌸 and lots of ☕
          </p>
        </div>
      </div>
    </footer>
  );
}
