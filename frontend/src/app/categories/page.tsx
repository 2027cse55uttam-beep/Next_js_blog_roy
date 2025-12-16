"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Hash, ArrowRight } from "lucide-react";
import styles from "./categories.module.css";

// Deployment URL Fix
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/categories/`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <main className={styles.main}>
      
      {/* Background Animated Blobs */}
      <div className={styles.blobContainer}>
        <div className={`${styles.blob} ${styles.blob1}`}></div>
        <div className={`${styles.blob} ${styles.blob2}`}></div>
      </div>

      <div className={styles.container}>
        
        {/* Header Section */}
        <div className={styles.header}>
          <h1 className={styles.title}>
            Explore <span className={styles.highlight}>Topics</span>
          </h1>
          <p className={styles.subtitle}>
            Browse our extensive collection of articles by category. 
            Find exactly what you are looking for to level up your skills.
          </p>
        </div>

        {/* Loading State (Skeleton) */}
        {loading ? (
          <div className={styles.loadingGrid}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className={styles.skeletonCard}></div>
            ))}
          </div>
        ) : (
          <>
            {/* Categories Grid */}
            {categories.length > 0 ? (
              <div className={styles.grid}>
                {categories.map((category) => (
                  <Link 
                    key={category.id} 
                    href={`/category/${category.slug}`} 
                    className={styles.card}
                  >
                    {/* Icon Wrapper */}
                    <div className={styles.iconWrapper}>
                      {/* Using first letter or icon */}
                      <span style={{ fontSize: '1.5rem' }}>#</span>
                    </div>

                    <h2 className={styles.cardTitle}>{category.name}</h2>
                    
                    <span className={styles.exploreText}>
                      View Articles <ArrowRight size={16} style={{display:'inline', marginLeft:4}}/>
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className={styles.emptyState}>
                <Hash size={48} style={{margin:'0 auto 10px', opacity:0.5}} />
                <p>No categories found.</p>
              </div>
            )}
          </>
        )}

      </div>
    </main>
  );
}