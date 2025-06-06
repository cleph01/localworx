import db from "@/db/db";

export function getBusinessesByOwnerIdDAO(ownerId: string) {
  return db("businesses").where("owner_id", ownerId);
}

export function getAllBusinessesDAO() {
  return db("businesses").select("*");
}
