// app/api/promoter/content/contentController.ts

import { NextRequest, NextResponse } from "next/server";
import {
  createContent,
  getAllContentByUser,
  getContentById,
  updateContent,
  deleteContent,
} from "./contentService";
import { ContentUpdateInput } from "./contentTypes";

export async function createContentHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const newContent = await createContent(body);
    return NextResponse.json(newContent, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function getAllContentHandler(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const contentList = await getAllContentByUser(params.id);
    return NextResponse.json(contentList);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function getContentByIdHandler(
  req: NextRequest,
  { params }: { params: { id: string; userId: string } }
) {
  try {
    const { id, userId } = params;
    const content = await getContentById(id, userId);
    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }
    return NextResponse.json(content);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function updateContentHandler(
  req: NextRequest,
  { params }: { params: { id: string; userId: string } }
) {
  try {
    const { id, userId } = params;

    // Parse the JSON body and type it as ContentUpdateInput
    const updates: ContentUpdateInput = await req.json();

    // Validate the updates object (optional, but recommended)
    if (!updates || typeof updates !== "object") {
      return NextResponse.json(
        { error: "Invalid update data" },
        { status: 400 }
      );
    }

    const updatedContent = await updateContent(id, userId, updates);
    return NextResponse.json(updatedContent);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function deleteContentHandler(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteContent(params.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
