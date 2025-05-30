// api/business/create/businessController.ts

import { NextRequest, NextResponse } from "next/server";
import {
  fetchBusiness,
  addBusiness,
  modifyBusiness,
  removeBusiness,
} from "./businessService";

// Fetch a single business by ID
export async function getBusinessByIdHandler(_: NextRequest, id: string) {
  try {
    const businessId = Number(id);
    const business = await fetchBusiness(businessId);
    return business
      ? NextResponse.json(business)
      : NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (err) {
    console.error("Error in getBusinessByIdHandler:", err);
    return NextResponse.json(
      { error: "Failed to fetch business" },
      { status: 500 }
    );
  }
}

// Add a new business
export async function addBusinessHandler(req: NextRequest) {
  try {
    const data = await req.json();
    const business = await addBusiness(data);
    return NextResponse.json(business, { status: 201 });
  } catch (err) {
    console.error("Error in addBusinessHandler:", err);
    return NextResponse.json(
      { error: "Failed to create business" },
      { status: 500 }
    );
  }
}

// Modify/update a business
export async function updateBusinessHandler(req: NextRequest, id: string) {
  try {
    const businessId = Number(id);
    const updates = await req.json();
    const business = await modifyBusiness(businessId, updates);
    return NextResponse.json(business);
  } catch (err) {
    console.error("Error in updateBusinessHandler:", err);
    return NextResponse.json(
      { error: "Failed to update business" },
      { status: 500 }
    );
  }
}

// Delete a business
export async function deleteBusinessHandler(_: NextRequest, id: string) {
  try {
    const businessId = Number(id);
    await removeBusiness(businessId);
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    console.error("Error in deleteBusinessHandler:", err);
    return NextResponse.json(
      { error: "Failed to delete business" },
      { status: 500 }
    );
  }
}
