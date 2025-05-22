✅ Recommended File Structure

```bash
/app
  /api
    /businesses
      /nearby
        route.ts                       ← API route entry
        nearbyController.ts            ← Handles query param parsing, calls service
        nearbyService.ts               ← Filters businesses using Haversine
        nearbyDAO.ts                   ← DB queries for business data
        nearbyTypes.ts                 ← Business, LatLng, etc.

```

This keeps all business-related logic grouped together, and your nearby/route.ts can be lean and focused on routing.

🔁 Flow Example

???
