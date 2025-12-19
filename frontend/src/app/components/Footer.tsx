'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';
import styles from './footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll Detection for Smooth Pop Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className={`${styles.footer} ${isVisible ? styles.visible : ''}`}
    >
      
      {/* Social Icons */}
      <div className={styles.socialWrapper}>
        <a href="#" className={styles.socialIcon} aria-label="Facebook">
          <Facebook size={24} />
        </a>
        <a href="#" className={styles.socialIcon} aria-label="Twitter">
          <Twitter size={24} />
        </a>
        <a href="#" className={styles.socialIcon} aria-label="YouTube">
          <Youtube size={24} />
        </a>
        <a href="#" className={styles.socialIcon} aria-label="Instagram">
          <Instagram size={24} />
        </a>
        <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
          <Linkedin size={24} />
        </a>
      </div>

      {/* Blog Categories */}
      <h3 className={styles.sectionTitle}>Explore Topics:</h3>
      
      <div className={styles.tagsWrapper}>
        <Link href="/category/coding" className={styles.tagLink}>
          Next.js Development
        </Link>
        <Link href="/category/technology" className={styles.tagLink}>
          Tech Reviews
        </Link>
        <Link href="/category/lifestyle" className={styles.tagLink}>
          Developer Lifestyle
        </Link>
        <Link href="/contact" className={styles.tagLink}>
          Work With Me
        </Link>
      </div>

      {/* Branding & Copyright */}
      <h2 className={styles.brandName}>My Awesome Blog</h2>
      <p className={styles.copyright}>
        Copyright © {currentYear} My Awesome Blog. <br />
        All Rights Reserved. Developed by Uttam Roy.
      </p>

    </footer>
  );
}