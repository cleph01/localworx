// app/api/promoter/content/contentService.ts

import {
  getAllContentByUser,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
} from "./contentDAO";
import { Content, ContentInput, ContentUpdateInput } from "./contentTypes";

/**
 * Create new promotional content.
 */
export async function createContent(data: ContentInput) {
  // Business logic (e.g., input validation, rate limiting) could go here
  return await createContent(data);
}

/**
 * Get all content created by a specific user.
 */
export async function getAllContentByUser(userId: string) {
  return await getAllContentByUser(userId);
}

/**
 * Get a single content item by ID, ensuring ownership.
 */
export async function getContentById(
  id: string,
  userId: string
): Promise<Content | null> {
  const content = await getContentById(id, userId);
  if (!content) throw new Error("Content not found");
  if (content.user_id !== userId) throw new Error("Unauthorized access");
  return content;
}

/**
 * Update a content item.
 */
export async function updateContent(
  id: string,
  data: ContentUpdateInput,
  userId: string
) {
  const content = await getContentById(id, userId); // Ensure ownership
  return await updateContent(id, data);
}

/**
 * Delete a content item.
 */
export async function deleteContent(id: string, userId: string) {
  const content = await getContentById(id, userId); // Ensure ownership
  return await deleteContent(id);
}
