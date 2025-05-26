import { mockFetch } from "../../utilities/mockDatabase/mockFetch";
import { Checkin } from "../../utilities/mockDatabase/mockDatabase";

export async function submitCheckin(checkin: Omit<Checkin, "id">) {
  try {
    const response = await mockFetch("/api/checkins", {
      method: "POST",
      body: checkin,
    });

    return response.data;
  } catch (error) {
    console.error("Check-in failed:", error);
    throw error;
  }
}
