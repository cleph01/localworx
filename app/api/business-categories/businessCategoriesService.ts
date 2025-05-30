import { getAllBusinessCategories } from "./businessCategoriesDAO";

export async function fetchBusinessCategories() {
  return getAllBusinessCategories();
}
