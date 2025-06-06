import {
  getBusinessesByOwnerIdDAO,
  getAllBusinessesDAO,
} from "./businessesDAO";

export function getBusinessesByOwnerIdService(ownerId: string) {
  return getBusinessesByOwnerIdDAO(ownerId);
}

export function getAllBusinessesService() {
  return getAllBusinessesDAO();
}
