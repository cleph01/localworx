"use client";

import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
  media_url: string | null;
  media_type: "image" | "video" | null;
  expires_at: string | null;
  is_active: boolean;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}

export function useFetchPostsByAuthorId(authorId: string | number | undefined) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authorId) return;

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
        const response = await fetch(
          `${baseUrl}/api/posts?authorId=${authorId}`,
          { cache: "no-store" }
        );

        if (!response.ok) throw new Error("Failed to fetch posts by author");

        const data = await response.json();
        setPosts(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [authorId]);

  return { posts, loading, error };
}
