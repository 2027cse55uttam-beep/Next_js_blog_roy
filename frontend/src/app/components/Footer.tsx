'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Github, Linkedin } from 'lucide-react';
import styles from './footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll Detection for "Pop" Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger animation when 20% of footer is visible
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Run only once
        }
      },
      { threshold: 0.2 } 
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className={`${styles.footer} ${isVisible ? styles.visible : styles.hidden}`}
    >
      
      {/* 1. Social Icons (Top Center) */}
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

      {/* 2. Blog Categories (Replacing "Personal Projects") */}
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

      {/* 3. Branding & Copyright (Bottom) */}
      <h2 className={styles.brandName}>My Awesome Blog</h2>
      <p className={styles.copyright}>
        Copyright © {currentYear} My Awesome Blog. <br />
        All Rights Reserved. Developed by Uttam Roy.
      </p>

    </footer>
  );
}