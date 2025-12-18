'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Send } from 'lucide-react';
import styles from './footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      
      {/* Background Gradient Blob */}
      <div className={styles.gradientBlob} />

      <div className={styles.container}>
        
        {/* --- Top Section: CTA & Newsletter --- */}
        <div className={styles.topSection}>
          
          {/* Brand Promise */}
          <div style={{ maxWidth: '36rem' }}>
            <h2 className={styles.heading}>
              Ready to elevate your <br />
              <span className={styles.highlight}>Tech Knowledge?</span>
            </h2>
            <p className={styles.subHeading}>
              Join 10,000+ developers and creators. Get the latest insights, tutorials, and trends delivered to your inbox. No spam, ever.
            </p>
            
            {/* Socials */}
            <div className={styles.socialWrapper}>
              {[Twitter, Facebook, Instagram, Youtube].map((Icon, idx) => (
                <a key={idx} href="#" className={styles.socialIcon}>
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Input */}
          <div className={styles.newsletterBox}>
            <h3 className={styles.boxTitle}>Subscribe to Newsletter</h3>
            <p className={styles.boxDesc}>Stay ahead of the curve with our weekly digest.</p>
            
            <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className={styles.input}
              />
              <button type="submit" className={styles.subscribeBtn}>
                Join <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* --- Divider --- */}
        <div className={styles.divider} />

        {/* --- Links Grid --- */}
        <div className={styles.linksGrid}>
          {[
            {
              title: "Explore",
              links: [
                { name: "Technology", href: "/category/technology" },
                { name: "Coding", href: "/category/coding" },
                { name: "Lifestyle", href: "/category/lifestyle" },
                { name: "Travel", href: "/category/travel" },
              ]
            },
            {
              title: "Company",
              links: [
                { name: "About Us", href: "/about" },
                { name: "Careers", href: "#" },
                { name: "Contact", href: "/contact" },
                { name: "Partners", href: "#" },
              ]
            },
            {
              title: "Resources",
              links: [
                { name: "Newsletter", href: "#" },
                { name: "Community", href: "#" },
                { name: "Help Center", href: "#" },
                { name: "Sitemap", href: "/sitemap" },
              ]
            },
            {
              title: "Legal",
              links: [
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Cookie Policy", href: "/cookies" },
              ]
            }
          ].map((column, idx) => (
            <div key={idx}>
              <h4 className={styles.colTitle}>{column.title}</h4>
              <ul className={styles.linkList}>
                {column.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link href={link.href} className={styles.linkItem}>
                      <span className={styles.dot} />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* --- Bottom: Big Text & Copyright --- */}
        <div className={styles.bottomBar}>
          <p>&copy; {currentYear} My Blog. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <a href="#" className={styles.legalLink}>Privacy</a>
            <a href="#" className={styles.legalLink}>Terms</a>
            <a href="#" className={styles.legalLink}>Cookies</a>
          </div>
        </div>
      </div>

      {/* --- GIANT FOOTER TEXT --- */}
      <div className={styles.giantTextContainer}>
        <h1 className={styles.giantText}>
          My Awesome Blog
        </h1>
      </div>
    </footer>
  );
}