export type Post = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  media_url: string | null;
  media_type: "image" | "video" | null;
  expires_at: string | null;
  is_active: boolean;
  tags: string | null; // serialized JSON
  category_id: number | null;
  created_at: string;
  updated_at: string;
};
