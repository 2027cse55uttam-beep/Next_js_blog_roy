"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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
  created_at: string;
  category: Category;
}

export default function CategoryPage() {
  const params = useParams(); // URL se slug milega (e.g., 'technology')
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.slug) return;

    const fetchPosts = async () => {
      try {
        // Backend API ko filter query ke sath call kar rahe hain
        const res = await fetch(`http://localhost:9000/api/posts/?category=${params.slug}`);
        const data = await res.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching category posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [params.slug]);

  if (loading) return <div className="text-center mt-20 text-xl">Loading...</div>;

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline mb-8 inline-block">
          ← Back to All Posts
        </Link>

        <h1 className="text-4xl font-extrabold text-center mb-2 text-gray-800 capitalize">
          {params.slug} Posts
        </h1>
        <p className="text-center text-gray-500 mb-12">
          Found {posts.length} posts in this category
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col">
              {post.image ? (
                <div className="relative h-48 w-full">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                </div>
              ) : (
                <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
              )}

              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-2">{post.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="text-blue-600 font-semibold hover:text-blue-800 transition">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No posts found in this category.
          </div>
        )}
      </div>
    </main>
  );
}