// ✅ app/api/business/products/businessProductTypes.ts

// Product shape returned to the frontend
export interface BusinessProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  businessId: string;
}

// Payload for creating a new product
export interface CreateBusinessProductRequest {
  name: string;
  description: string;
  price: number;
  businessId: string;
}

// Payload for updating an existing product
export interface UpdateBusinessProductRequest {
  id: string;
  name?: string;
  description?: string;
  price?: number;
}

// Generic response for success/failure messages
export interface BusinessProductResponse {
  success: boolean;
  message: string;
  data?: BusinessProduct | BusinessProduct[];
}
