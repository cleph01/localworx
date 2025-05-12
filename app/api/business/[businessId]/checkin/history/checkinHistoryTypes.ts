export interface CheckInHistoryEntry {
  businessId: number;
  businessName: string;
  timestamp: string;
  distanceMeters: number;
}

export interface RawCheckInHistoryRecord {
  businessId: number;
  businessName: string;
  timestamp: string;
  checkinLat: number;
  checkinLng: number;
  businessLat: number;
  businessLng: number;
}
