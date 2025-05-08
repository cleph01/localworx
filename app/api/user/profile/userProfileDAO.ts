// ✅ app/api/user/profile/userProfileDAO.ts
import knex from "@/db/db";
import { UserProfileUpdateInput } from "./userProfileTypes";

export async function getUserProfile(userId: string) {
  return await knex("users")
    .select("id", "name", "email", "image")
    .where({ id: userId })
    .first();
}

export async function updateUserProfile(input: UserProfileUpdateInput) {
  return await knex("users")
    .where({ id: input.id })
    .update({ name: input.name, image: input.image });
}

export async function deleteUserProfile(userId: string) {
  return await knex("users").where({ id: userId }).del();
}
