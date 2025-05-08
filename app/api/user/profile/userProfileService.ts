// ✅ app/api/user/profile/userProfileService.ts
import {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from "./userProfileDAO";
import { UserProfileUpdateInput } from "./userProfileTypes";

export async function getUserProfileService(userId: string) {
  return await getUserProfile(userId);
}

export async function updateUserProfileService(input: UserProfileUpdateInput) {
  if (
    !input.id ||
    typeof input.name !== "string" ||
    typeof input.image !== "string"
  ) {
    throw new Error("Invalid input data");
  }
  return await updateUserProfile(input);
}

export async function deleteUserProfileService(userId: string) {
  if (!userId) {
    throw new Error("User ID is required for deletion");
  }
  return await deleteUserProfile(userId);
}
