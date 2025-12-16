"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, Share2, Heart, MessageCircle } from "lucide-react";
import styles from "./blogPost.module.css";
import DOMPurify from "isomorphic-dompurify"; // SECURITY FIX

// DEPLOYMENT FIX: Environment variable for API URL
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
  content: string;
  excerpt: string;
  created_at: string;
  category?: Category;
}

export default function BlogPost() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll Progress Logic
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!params.slug) return;

    const fetchPost = async () => {
      try {
        // FIX: Use API_BASE_URL instead of localhost
        const res = await fetch(`${API_BASE_URL}/api/posts/${params.slug}/`);
        if (!res.ok) throw new Error("Post not found");
        const data = await res.json();
        setPost(data);

        // Fetch related posts (same category)
        if (data.category) {
          const relatedRes = await fetch(
            `${API_BASE_URL}/api/posts/?category=${data.category.slug}`
          );
          const relatedData = await relatedRes.json();
          // Filter out current post and limit to 3
          setRelatedPosts(
            relatedData.filter((p: Post) => p.slug !== params.slug).slice(0, 3)
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p style={{color: '#64748b', fontWeight: 500}}>Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.loadingContainer}>
        <h1 style={{fontSize: '2rem', fontWeight: 800, color: '#1e293b'}}>404</h1>
        <p style={{color: '#64748b', marginBottom: '20px'}}>Article not found</p>
        <Link href="/" className={styles.backLink} style={{fontSize: '1rem'}}>
          Back to Home
        </Link>
      </div>
    );
  }

  const readingTime = Math.ceil(post.content.split(" ").length / 200);

  return (
    <main className={styles.main}>
      
      {/* Scroll Progress Bar */}
      <div 
        className={styles.progressBar} 
        style={{ transform: `scaleX(${scrollProgress})`, transformOrigin: '0%' }} 
      />

      {/* Header Section */}
      <div className={styles.headerWrapper}>
        <div className={styles.container}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={18} /> Back to Articles
          </Link>

          {post.category && (
            <div style={{display:'block'}}>
              <Link href={`/category/${post.category.slug}`} className={styles.categoryBadge}>
                {post.category.name}
              </Link>
            </div>
          )}

          <h1 className={styles.title}>{post.title}</h1>

          {/* Author & Meta */}
          <div className={styles.metaWrapper}>
            <div className={styles.authorInfo}>
              {/* Dummy Avatar */}
              <Image 
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
                width={44} 
                height={44} 
                alt="Author" 
                className={styles.authorAvatar} 
              />
              <div className={styles.metaText}>
                <span className={styles.authorName}>Alex Dev</span>
                <span className={styles.date}>
                  {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
            </div>

            <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
              <Clock size={18} /> {readingTime} min read
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {post.image && (
        <div className={styles.container} style={{maxWidth: '1000px', padding: 0}}>
          <div className={styles.imageWrapper}>
            <Image
              src={post.image}
              alt={post.title}
              fill
              className={styles.featuredImage}
              priority
            />
          </div>
        </div>
      )}

      {/* Content Section */}
      <article className={styles.container}>
        <div className={styles.articleContent}>
          <div
            className={styles.prose}
            // SECURITY FIX: Sanitize HTML content
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
          />
        </div>
      </article>

      {/* Sticky Bottom Actions */}
      <div className={styles.shareBar}>
        <button className={styles.shareBtn} style={{color:'#ef4444'}}>
          <Heart size={20} /> 124
        </button>
        <button className={styles.shareBtn}>
          <MessageCircle size={20} /> Comment
        </button>
        <div style={{width: '1px', height: '20px', background: '#cbd5e1'}}></div>
        <button onClick={handleShare} className={styles.shareBtn} style={{color:'#2563eb'}}>
          <Share2 size={20} /> Share
        </button>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>Read Next</h2>
          <div className={styles.relatedGrid}>
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.slug}`}
                className={styles.relatedCard}
              >
                <div className={styles.relatedImage}>
                  {relatedPost.image && (
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      style={{objectFit: 'cover'}}
                    />
                  )}
                </div>
                <div className={styles.relatedContent}>
                  <h3 className={styles.relatedCardTitle}>
                    {relatedPost.title}
                  </h3>
                  <span className={styles.readMore}>Read Article →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </main>
  );
}