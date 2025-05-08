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

export async function listBusinesses(ownerId?: number) {
  const query = db("businesses").select("*");
  if (ownerId) query.where({ owner_id: ownerId });
  return query;
}
