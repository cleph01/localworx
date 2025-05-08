// app/api/promoter/content/contentDAO.ts

import db from "@/db/db";
import { Content, ContentInput, ContentUpdateInput } from "./contentTypes";

export async function createContent(input: ContentInput): Promise<Content> {
  const [content] = await db("promoter_content").insert(input).returning("*");
  return content;
}

export async function getAllContent(): Promise<Content[]> {
  return db("promoter_content").select("*").orderBy("created_at", "desc");
}

export async function getContentById(id: string): Promise<Content | null> {
  const [content] = await db("promoter_content").where({ id }).limit(1);
  return content || null;
}

export async function getContentByUser(userId: string): Promise<Content[]> {
  return db("promoter_content")
    .where({ user_id: userId })
    .orderBy("created_at", "desc");
}

export async function updateContent(
  id: string,
  updates: ContentUpdateInput
): Promise<Content | null> {
  const [content] = await db("promoter_content")
    .where({ id })
    .update({ ...updates, updated_at: new Date() })
    .returning("*");
  return content || null;
}

export async function deleteContent(id: string): Promise<boolean> {
  const rowsAffected = await db("promoter_content").where({ id }).del();
  return rowsAffected > 0;
}
