import { CheckInRequest } from "./checkinTypes";
import { validateCheckInRequest } from "./checkinValidation";
import { performCheckIn } from "./checkinService";

export async function handleCheckIn(data: CheckInRequest) {
  validateCheckInRequest(data); // throws if invalid
  return await performCheckIn(data);
}
