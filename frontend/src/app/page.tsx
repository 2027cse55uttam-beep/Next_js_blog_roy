"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, Clock, Sparkles } from "lucide-react";
import styles from "./home.module.css";

// Use environment variable for API URL or fallback to localhost
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
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Ref for intersection observer to track visibility for animations
  const observer = useRef<IntersectionObserver | null>(null);

  // 1. Data Fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Categories
        const catRes = await fetch(`${API_BASE_URL}/api/categories/`);
        if (catRes.ok) setCategories(await catRes.json());
        
        // Fetch Initial Posts
        const postRes = await fetch(`${API_BASE_URL}/api/posts/`);
        if (postRes.ok) setPosts(await postRes.json());
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. Scroll Animation Logic (The "Reveal" Effect)
  useEffect(() => {
    if (loading) return;

    // Disconnect previous observer if exists
    if (observer.current) observer.current.disconnect();

    // Create new observer
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // If element is visible on screen
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.revealVisible); // Add animation class
          observer.current?.unobserve(entry.target); // Stop observing once revealed
        }
      });
    }, { threshold: 0.1 }); // Trigger when 10% visible

    // Select all elements with 'reveal' class
    const hiddenElements = document.querySelectorAll(`.${styles.reveal}`);
    hiddenElements.forEach((el) => observer.current?.observe(el));

    return () => observer.current?.disconnect();
  }, [posts, loading]); // Re-run when posts update

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts/?search=${search}`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      
      {/* Background Animated Blobs for Glassmorphism */}
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
              <span style={{color: '#2563eb'}}>Tech Articles</span>
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

        {/* --- STICKY SEARCH BAR (Glassmorphism) --- */ }
        <div className={`${styles.searchWrapper} ${styles.reveal}`}>
          <div className={`${styles.glassCard} ${styles.searchBar}`}>
            <Search size={24} color="#64748b" />
            <form onSubmit={handleSearch} style={{flex:1, display:'flex'}}>
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
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className={styles.skeletonCard}></div>
              ))}
            </div>
          ) : (
            <>
              {posts.length > 0 ? (
                <div className={styles.grid}>
                  {posts.map((post, index) => (
                    <article 
                      key={post.id} 
                      // 'reveal' class triggers the scroll animation
                      // style transitionDelay creates a staggered effect (cards appear one by one)
                      className={`${styles.glassCard} ${styles.postCard} ${styles.reveal}`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className={styles.imageContainer}>
                        {post.image ? (
                          <Image 
                            src={post.image} 
                            alt={post.title} 
                            fill 
                            className={styles.postImage} 
                            // Optimized sizes for responsiveness
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div style={{width:'100%', height:'100%', background:'#e2e8f0', display:'flex', alignItems:'center', justifyContent:'center'}}>📝</div>
                        )}
                      </div>

                      <div className={styles.content}>
                        {post.category && (
                          <span className={styles.tag}>{post.category.name}</span>
                        )}
                        <h2 className={styles.title}>{post.title}</h2>
                        <p className={styles.excerpt}>{post.excerpt}</p>
                        
                        <div className={styles.footer}>
                          <div style={{display:'flex', alignItems:'center', gap:5}}>
                            <Clock size={14} />
                            {new Date(post.created_at).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                          <Link href={`/blog/${post.slug}`} className={styles.link}>
                            Read More <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className={`${styles.glassCard} ${styles.emptyState} ${styles.reveal}`}>
                  <h3>No articles found matching "{search}".</h3>
                  <button 
                    onClick={() => {
                      setSearch(""); 
                      setLoading(true);
                      fetch(`${API_BASE_URL}/api/posts/`)
                        .then(res => res.json())
                        .then(data => { setPosts(data); setLoading(false); });
                    }}
                    style={{marginTop:20, background:'none', border:'none', color:'#2563eb', cursor:'pointer', fontWeight:600}}
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </main>
  );
}