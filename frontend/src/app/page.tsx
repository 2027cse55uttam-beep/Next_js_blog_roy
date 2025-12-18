"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, Sparkles, Heart } from "lucide-react";
import styles from "./home.module.css";

// API Config
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  image: string;
  excerpt: string;
  content: string;
  created_at: string;
  category: Category;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Intersection Observer for Scroll Animation
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/posts/`);
        if (res.ok) setPosts(await res.json());
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Animation Logic
  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.revealVisible);
          observer.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll(`.${styles.reveal}`);
    hiddenElements.forEach((el) => observer.current?.observe(el));

    return () => observer.current?.disconnect();
  }, [posts, loading]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts/?search=${search}`);
      if (res.ok) setPosts(await res.json());
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      
      {/* --- BACKGROUND ANIMATION --- */}
      <div className={styles.blobContainer}>
        <div className={`${styles.blob} ${styles.blob1}`}></div>
        <div className={`${styles.blob} ${styles.blob2}`}></div>
        <div className={`${styles.blob} ${styles.blob3}`}></div>
      </div>

      <div className={styles.container}>
        
        {/* --- HERO SECTION --- */}
        <section className={styles.heroSection}>
          <div className={`${styles.heroContent} ${styles.reveal}`}>
            <span className={styles.heroBadge}>
              <Sparkles size={14} style={{display:'inline', marginRight:5}} />
              Future of Tech Blogging
            </span>
            <h1 className={styles.heroTitle}>
              Discover World-Class <br />
              <span className={styles.highlightText}>Tech Articles</span>
            </h1>
            <p className={styles.heroDesc}>
              Explore the latest in coding, design, and technology. 
              Curated tutorials for developers who want to level up their skills.
            </p>
            <div className={styles.heroActions}>
              <a href="#posts" className={styles.btnPrimary}>Start Reading</a>
            </div>
          </div>

          <div className={`${styles.heroImageCard} ${styles.glassCard} ${styles.reveal}`}>
            <Image 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop" 
              alt="Hero Coding Setup" 
              width={600} 
              height={400} 
              className={styles.heroImage} 
              priority
            />
          </div>
        </section>

        {/* --- SEARCH BAR --- */}
        <div className={`${styles.searchWrapper} ${styles.reveal}`}>
          <div className={`${styles.glassCard} ${styles.searchBar}`}>
            <Search size={22} color="#64748b" style={{marginLeft: 10}} />
            <form onSubmit={handleSearch} style={{flex:1}}>
              <input 
                type="text" 
                placeholder="Search articles, topics (e.g. Next.js)..." 
                className={styles.searchInput}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
            <button onClick={handleSearch} className={styles.searchBtn}>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* --- POSTS GRID --- */}
        <div id="posts">
          {loading ? (
            <div className={styles.grid}>
              {[1, 2, 3, 4, 5, 6].map((n) => <div key={n} className={styles.skeletonCard}></div>)}
            </div>
          ) : (
            <div className={styles.grid}>
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <Link 
                    href={`/blog/${post.slug}`} 
                    key={post.id} 
                    className={`${styles.card} ${styles.reveal}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {/* Top: Icon & Heart */}
                    <div className={styles.cardHeader}>
                      <div className={styles.iconBox}>
                        {post.image ? (
                          <Image 
                            src={post.image} 
                            alt="icon" 
                            width={40} 
                            height={40} 
                            className={styles.cardIcon} 
                          />
                        ) : (
                          <span style={{fontSize:'20px'}}>📝</span>
                        )}
                      </div>
                      <button className={styles.heartBtn} onClick={(e) => {
                        e.preventDefault(); // Prevent link click
                        // Add like logic here
                      }}>
                        <Heart size={20} />
                      </button>
                    </div>

                    {/* Middle: Content */}
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>{post.title}</h3>
                      <p className={styles.cardExcerpt}>
                        {post.excerpt.length > 70 ? post.excerpt.substring(0, 70) + "..." : post.excerpt}
                      </p>
                    </div>

                    {/* Bottom: Pill Tag */}
                    <div className={styles.cardFooter}>
                       {post.category && (
                          <span className={styles.pillTag}>
                            {post.category.name}
                          </span>
                       )}
                    </div>
                  </Link>
                ))
              ) : (
                <div className={`${styles.glassCard} ${styles.emptyState} ${styles.reveal}`}>
                  <h3>No articles found matching "{search}".</h3>
                  <button onClick={() => window.location.reload()} className={styles.btnLink}>
                    Refresh All Posts
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}