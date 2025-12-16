'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'; // Icons import

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#f9faff] overflow-hidden border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Brand & Newsletter */}
        <div className="grid grid-cols-1 gap-8 border-b border-gray-900/10 py-12 md:grid-cols-2 lg:py-16">
          
          {/* Brand & Description */}
          <div>
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-purple-600">My Blog</span>
                <span className="ml-2 rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-600">
                  Tech & Life
                </span>
              </Link>
            </div>
            <p className="mt-4 max-w-md text-base text-gray-600">
              Discover amazing stories, technical insights, and creative ideas. 
              Join our growing community of readers and writers today.
            </p>
            
            {/* Social Icons */}
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-purple-600 transition">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition">
                <span className="sr-only">YouTube</span>
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="md:ml-auto md:max-w-md w-full">
            <h3 className="text-sm font-semibold text-gray-900">Subscribe to our newsletter</h3>
            <p className="mt-2 text-sm text-gray-600">
              Get weekly articles, tutorials, and updates delivered to your inbox.
            </p>
            <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex gap-x-3">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  type="email"
                  required
                  className="min-w-0 flex-auto rounded-lg border-0 bg-white px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="flex-none rounded-lg bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-3 md:grid-cols-4 lg:py-16">
          
          {/* Column 1: Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Categories</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <Link href="/category/technology" className="text-sm text-gray-600 hover:text-purple-600 transition">Technology</Link>
              </li>
              <li>
                <Link href="/category/coding" className="text-sm text-gray-600 hover:text-purple-600 transition">Coding</Link>
              </li>
              <li>
                <Link href="/category/lifestyle" className="text-sm text-gray-600 hover:text-purple-600 transition">Lifestyle</Link>
              </li>
              <li>
                <Link href="/category/travel" className="text-sm text-gray-600 hover:text-purple-600 transition">Travel</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Quick Links</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-purple-600 transition">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-purple-600 transition">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-purple-600 transition">Contact</Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-sm text-gray-600 hover:text-purple-600 transition">Sitemap</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-purple-600 transition">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-purple-600 transition">Terms of Service</Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-gray-600 hover:text-purple-600 transition">Cookie Policy</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Community */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Community</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition">Discord Server</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition">Twitter</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition">GitHub</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="flex flex-col items-center border-t border-gray-900/10 py-8 sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-600">
            &copy; {currentYear} My Blog. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
             {/* Optional: Extra links or social icons repeated here */}
             <span className="text-sm text-gray-400">Designed with ❤️</span>
          </div>
        </div>
      </div>
    </footer>
  );
}