File Structure

```bash

/app
  /api
    /businesses
      /[id]
        route.ts           ← for GET (one), PUT (update), DELETE
      /create
        route.ts           ← for POST (create business)
      /list
        route.ts           ← optional: list all or filter by owner
  /businesses
    businessDAO.ts
    businessService.ts
    businessController.ts
    businessTypes.ts
```

API Endpoints

- app/api/businesses/create/route.ts — POST /api/businesses/create

- app/api/businesses/[id]/route.ts — GET, PUT, DELETE

- Optional: GET /api/businesses/list?ownerId=...
