import { NextRequest, NextResponse } from "next/server";
import {
  fetchBusiness,
  fetchBusinesses,
  addBusiness,
  modifyBusiness,
  removeBusiness,
} from "./businessService";

// Fetch a single business by ID
export async function getBusinessByIdHandler(
  _: NextRequest,
  params: { id: string }
) {
  try {
    const id = Number(params.id);
    const business = await fetchBusiness(id);
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

// Fetch all businesses by ownerId
export async function getBusinessesHandler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ownerId = searchParams.get("ownerId")
      ? Number(searchParams.get("ownerId"))
      : undefined;

    const businesses = await fetchBusinesses(ownerId);
    return NextResponse.json(businesses);
  } catch (err) {
    console.error("Error in getBusinessesHandler:", err);
    return NextResponse.json(
      { error: "Failed to fetch businesses" },
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
export async function updateBusinessHandler(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const updates = await req.json();
    const business = await modifyBusiness(id, updates);
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
export async function deleteBusinessHandler(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    await removeBusiness(id);
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    console.error("Error in deleteBusinessHandler:", err);
    return NextResponse.json(
      { error: "Failed to delete business" },
      { status: 500 }
    );
  }
}
