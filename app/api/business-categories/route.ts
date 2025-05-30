import { NextRequest } from "next/server";
import { getBusinessCategoriesHandler } from "./businessCategoriesController";

export async function GET(req: NextRequest) {
  return getBusinessCategoriesHandler(req);
}
