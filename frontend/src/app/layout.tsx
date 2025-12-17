import NextTopLoader from 'nextjs-toploader';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Google Font Optimization
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import "./globals.css";

// Font Configuration (Automatic Optimization)
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  // ✅ IMPORTANT: Yahan apna Vercel URL dalein (Isse images aur links fix rahenge)
  metadataBase: new URL('https://next-js-blog-roy.vercel.app'),

  title: {
    default: 'My Awesome Blog',
    template: '%s | My Awesome Blog',
  },
  description: 'Discover insightful articles, tutorials, and stories on technology, coding, and lifestyle.',
  keywords: ['Next.js', 'React', 'Blog', 'Tech', 'Coding'],
  authors: [{ name: 'Uttam Roy' }], // Aap apna naam yahan likh sakte hain
  creator: 'Uttam Roy',
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    // ✅ URL Update kiya gaya hai
    url: 'https://next-js-blog-roy.vercel.app',
    title: 'My Awesome Blog',
    description: 'Discover insightful articles, tutorials, and stories.',
    siteName: 'My Awesome Blog',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'My Awesome Blog',
    // Agar aapka twitter handle hai toh yahan likhein, warn hata dein
    // creator: '@yourusername', 
  },
  
  robots: {
    index: true,
    follow: true,
  },

  // ✅ Agar aap Public folder se Favicon use kar rahe hain, toh ye uncomment karein:
  icons: {
    icon: '/favicon.png',
  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className={`antialiased bg-gray-50 text-gray-900 ${inter.className}`}>
      <NextTopLoader color="#2563eb" showSpinner={false} />
        
        {/* Accessibility Skip Link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-blue-600 focus:text-white focus:top-4 focus:left-4 focus:rounded-lg focus:shadow-lg transition-all"
        >
          Skip to main content
        </a>

        <div className="flex flex-col min-h-screen">
          <Navbar />

          {/* Main Content Area */}
          <main 
            id="main-content" 
            className="flex-grow pt-16 md:pt-20" // Padding for fixed navbar
          >
            {children}
          </main>

          <Footer />
        </div>

        {/* Client Side Components */}
        <ScrollToTop />
        
      </body>
    </html>
  );
}