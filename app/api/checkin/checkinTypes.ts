export type Checkin = {
  id?: string; // Optional for POST
  businessId: string;
  userId: string;
  timestamp: string;
  location: {
    latitude: number;
    longitude: number;
  };
};
