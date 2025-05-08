// ✅ app/api/user/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  handleGetUserProfile,
  handleUpdateUserProfile,
  handleDeleteUserProfile,
} from "./userProfileController";

export async function GET(req: NextRequest): Promise<NextResponse> {
  return handleGetUserProfile(req);
}

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  return handleUpdateUserProfile(req);
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  return handleDeleteUserProfile(req);
}
