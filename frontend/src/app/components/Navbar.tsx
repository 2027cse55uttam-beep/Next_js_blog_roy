'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, User, Mail, ChevronDown } from 'lucide-react';
import styles from './navbar.module.css';

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const pathname = usePathname();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // ✅ CORRECTED: Port 9000 hi rakha hai
        const res = await fetch('http://localhost:9000/api/categories/');
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        } else {
          console.error("Failed to fetch categories status:", res.status);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Scroll lock when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: User },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`${styles.navbar} ${
          scrolled ? styles.navbarScrolled : styles.navbarTransparent
        }`}
      >
        <div className={styles.navbarContainer}>
          <div className={styles.navbarContent}>
            {/* Logo */}
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}>Roy</span>
              <span className={styles.logoText}>Blog</span>
            </Link>

            {/* Desktop Menu */}
            <div className={styles.desktopMenu}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${styles.navLink} ${
                    isActive(link.href) ? styles.navLinkActive : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Categories Dropdown */}
              <div 
                className={styles.dropdown}
                onMouseEnter={() => setShowCategories(true)}
                onMouseLeave={() => setShowCategories(false)}
              >
                <button className={`${styles.navLink} ${styles.dropdownButton}`}>
                  Categories
                  <ChevronDown 
                    size={16} 
                    className={`${styles.chevron} ${showCategories ? styles.chevronOpen : ''}`}
                  />
                </button>
                
                {showCategories && (
                  <div className={styles.dropdownMenu}>
                    <Link 
                      href="/categories" 
                      className={styles.dropdownItem}
                    >
                      All Posts
                    </Link>
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        // ✅ CORRECTED: '/category/' (Singular) taaki 404 na aaye
                        href={`/category/${cat.slug}`}
                        className={styles.dropdownItem}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={styles.mobileMenuButton}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <div
                className={`${styles.hamburgerIcon} ${
                  isOpen ? styles.hamburgerIconOpen : ''
                }`}
              >
                <span className={styles.hamburgerLine}></span>
                <span className={styles.hamburgerLine}></span>
                <span className={styles.hamburgerLine}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${styles.mobileMenu} ${
            isOpen ? styles.mobileMenuOpen : ''
          }`}
        >
          <div className={styles.mobileMenuContent}>
            {navLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${styles.mobileNavLink} ${
                    isActive(link.href) ? styles.mobileNavLinkActive : ''
                  } ${isOpen ? styles.mobileNavLinkAnimate : ''}`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <IconComponent className={styles.mobileNavIcon} size={22} strokeWidth={2} />
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Categories */}
            <div className={styles.mobileCategoriesSection}>
              <div className={styles.mobileCategoriesTitle}>Categories</div>
              <Link 
                href="/categories" 
                className={`${styles.mobileNavLink} ${isOpen ? styles.mobileNavLinkAnimate : ''}`}
                style={{ animationDelay: `${navLinks.length * 0.1}s` }}
              >
                <BookOpen className={styles.mobileNavIcon} size={22} strokeWidth={2} />
                All Posts
              </Link>
              {categories.map((cat, index) => (
                <Link
                  key={cat.id}
                  // ✅ CORRECTED: '/category/' (Singular)
                  href={`/category/${cat.slug}`}
                  className={`${styles.mobileNavLink} ${isOpen ? styles.mobileNavLinkAnimate : ''}`}
                  style={{
                    animationDelay: `${(navLinks.length + 1 + index) * 0.1}s`,
                  }}
                >
                  <span className={styles.mobileNavIcon}>📁</span>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={() => setIsOpen(false)}
      />
    </>
  );
}