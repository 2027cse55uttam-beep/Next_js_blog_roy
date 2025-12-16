// src/utils/api.ts

// Ye automatic check karega: Agar live hai toh live URL, nahi toh localhost
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";

// Helper function images ke liye (Agar image path relative hai /media/...)
export const getImageUrl = (path: string) => {
  if (!path) return "/placeholder.jpg";
  if (path.startsWith("http")) return path; // Already full URL
  return `${API_BASE_URL}${path}`;
};