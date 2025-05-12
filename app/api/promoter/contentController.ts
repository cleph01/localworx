// app/api/promoter/content/contentController.ts

import { NextRequest, NextResponse } from "next/server";
import {
  createNewContent,
  getAllContentByUser,
  fetchContentById,
  updateContentService,
  deleteContentService,
} from "./contentService";
import { ContentUpdateInput } from "./contentTypes";

export async function createContentHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const newContent = await createNewContent(body);
    return NextResponse.json(newContent, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function getAllContentHandler(req: NextRequest, id: string) {
  try {
    const contentList = await getAllContentByUser(id);
    return NextResponse.json(contentList);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function getContentByIdHandler(req: NextRequest, id: string) {
  try {
    // UserId is needed to verify the content is their own
    // Extract the userId from the query parameters
    const searchParams = req.nextUrl.searchParams;
    // Get the userId from the query parameters
    const userId = searchParams.get("userId");
    // Check if userId is provided
    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }
    // Fetch the content by ID and userId
    const content = await fetchContentById(id, userId);
    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }
    return NextResponse.json(content);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function updateContentHandler(req: NextRequest, id: string) {
  try {
    // UserId is needed to verify the content is their own
    // Extract the userId from the query parameters
    const searchParams = req.nextUrl.searchParams;
    // Get the userId from the query parameters
    const userId = searchParams.get("userId");
    // Check if userId is provided
    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    // Parse the JSON body and type it as ContentUpdateInput
    const updates: ContentUpdateInput = await req.json();

    // Validate the updates object (optional, but recommended)
    if (!updates || typeof updates !== "object") {
      return NextResponse.json(
        { error: "Invalid update data" },
        { status: 400 }
      );
    }

    const updatedContent = await updateContentService(id, userId, updates);
    return NextResponse.json(updatedContent);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function deleteContentHandler(req: NextRequest, id: string) {
  try {
    // UserId is needed to verify the content is their own
    // Extract the userId from the query parameters
    const searchParams = req.nextUrl.searchParams;
    // Get the userId from the query parameters
    const userId = searchParams.get("userId");
    // Check if userId is provided
    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    await deleteContentService(id, userId);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
