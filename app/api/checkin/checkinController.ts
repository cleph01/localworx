import { NextRequest, NextResponse } from "next/server"; // Import NextResponse here
import { CheckInRequest, CheckInResponse } from "./checkinTypes";
import { validateCheckInRequest } from "./checkinValidation";
import { checkInUser } from "./checkinService";

// This function handles the incoming request for checking in a user
export async function handleCheckInRequest(
  req: NextRequest
): Promise<NextResponse> {
  try {
    const body: CheckInRequest = await req.json(); // Parse the request body here
    validateCheckInRequest(body); // Validate the incoming request
    const result = await checkInUser(body); // Delegate business logic to the service

    return NextResponse.json(result, { status: result.success ? 200 : 400 }); // Format the NextResponse here
  } catch (err) {
    return NextResponse.json(
      { success: false, message: (err as Error).message || "Server error" },
      { status: 400 }
    );
  }
}
