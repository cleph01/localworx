// app/api/promoter/content/contentTypes.ts

export interface Content {
  id: string;
  user_id: string;
  business_id: string;
  type: "video" | "post" | "image" | "other";
  title: string;
  description?: string;
  media_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ContentInput {
  user_id: string;
  business_id: string;
  type: "video" | "post" | "image" | "other";
  title: string;
  description?: string;
  media_url?: string;
}

export interface ContentUpdateInput {
  title?: string;
  description?: string;
  media_url?: string;
  type?: "video" | "post" | "image" | "other";
}
