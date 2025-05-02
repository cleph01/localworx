// Coordinates used in geolocation
export type Coordinates = {
  latitude: number;
  longitude: number;
};

// Payload received when a user attempts to check in
export type CheckInRequest = Coordinates & {
  businessId: string;
  userId: string;
};

// Optional: Payload returned in API response
export type CheckInResponse = {
  success: boolean;
  message: string;
};
