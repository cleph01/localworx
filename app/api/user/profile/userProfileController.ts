// ✅ app/api/user/profile/userProfileController.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOptions";
import {
  getUserProfileService,
  updateUserProfileService,
} from "./userProfileService";
import { UserProfileUpdateInput } from "./userProfileTypes";

export async function handleGetUserProfile(
  req: NextRequest
): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await getUserProfileService(session.user.id);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function handleUpdateUserProfile(
  req: NextRequest
): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, image } = await req.json();
    const input: UserProfileUpdateInput = {
      id: session.user.id,
      name,
      image,
    };
    await updateUserProfileService(input);
    return NextResponse.json({ message: "Profile updated" });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function handleDeleteUserProfile(
  req: NextRequest
): Promise<NextResponse> {
  // Future: implement actual deletion logic in service & DAO
  return NextResponse.json(
    { message: "Delete not implemented" },
    { status: 501 }
  );
}
