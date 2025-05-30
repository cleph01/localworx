// api/business/create/businessDAO.ts

import db from "@/db/db";
import { Business } from "./businessTypes";

export async function createBusiness(business: Business) {
  return db("businesses").insert(business).returning("*");
}

export async function getBusinessById(id: number) {
  return db("businesses").where({ id }).first();
}

export async function updateBusiness(id: number, updates: Partial<Business>) {
  return db("businesses").where({ id }).update(updates).returning("*");
}

export async function deleteBusiness(id: number) {
  return db("businesses").where({ id }).del();
}

export async function findOrCreateCategory(name: string): Promise<number> {
  const existing = await db("business_categories").where({ name }).first();

  if (existing) {
    return existing.id;
  }

  const [inserted] = await db("business_categories")
    .insert({ name })
    .returning("id");

  return inserted.id ?? inserted; // SQLite returns number directly
}
