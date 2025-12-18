import NextTopLoader from 'nextjs-toploader';
import type { Metadata, Viewport } from 'next'; // Added Viewport for better mobile control
import { Inter } from 'next/font/google'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import "./globals.css";

// 1. Font Configuration (Optimized)
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// 2. Viewport Settings (Fixes "Narrow" issues on mobile)
export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // Prevents zooming issues on inputs
};

export const metadata: Metadata = {
  metadataBase: new URL('https://next-js-blog-roy.vercel.app'),

  title: {
    default: 'My Awesome Blog',
    template: '%s | My Awesome Blog',
  },
  description: 'Discover world-class articles on coding, design, and technology.',
  keywords: ['Next.js', 'React', 'Blog', 'Tech', 'Coding', 'Web Development'],
  authors: [{ name: 'Uttam Roy' }],
  creator: 'Uttam Roy',
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://next-js-blog-roy.vercel.app',
    title: 'My Awesome Blog',
    description: 'Discover world-class articles on coding, design, and technology.',
    siteName: 'My Awesome Blog',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'My Awesome Blog',
  },
  
  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: '/favicon.png', // Ensure this file exists in public folder
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className={`
        antialiased 
        bg-slate-50 
        text-slate-900 
        selection:bg-blue-600 selection:text-white 
        overflow-x-hidden
        ${inter.className}
      `}>
        
        {/* Loading Bar at Top */}
        <NextTopLoader 
          color="#2563eb" 
          height={3} 
          showSpinner={false} 
          shadow="0 0 10px #2563eb,0 0 5px #2563eb"
        />
        
        {/* Accessibility Skip Link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-blue-600 focus:text-white focus:top-4 focus:left-4 focus:rounded-lg focus:shadow-lg transition-all"
        >
          Skip to main content
        </a>

        <div className="flex flex-col min-h-screen relative">
          
          {/* Navbar wrapper ensures it stays on top */}
          <div className="relative z-40">
            <Navbar />
          </div>

          {/* Main Content Area */}
          <main 
            id="main-content" 
            className="flex-grow pt-16 md:pt-20 relative z-10" 
          >
            {children}
          </main>

          <Footer />
        </div>

        {/* Scroll To Top Arrow (High Z-Index to show above blobs) */}
        <div className="relative z-50">
          <ScrollToTop />
        </div>
        
      </body>
    </html>
  );
}