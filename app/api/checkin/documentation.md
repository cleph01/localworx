### Checkin Folder Structure

```
app/
└── api/
    └── checkin/
        ├── route.ts              # Next.js API entry point
        ├── checkinController.ts  # Validation + request coordination
        ├── checkinValidation.ts  # Request payload validation
        ├── checkinService.ts     # Business logic (proximity checks, etc.)
        ├── checkinDAO.ts         # Database access (insert, fetch business location)
        ├── haversine.ts          # Utility: distance calculation
        └── checkinTypes.ts       # Type declarations
```

### Glossary

| File                   | Responsibility                                                                    |
| ---------------------- | --------------------------------------------------------------------------------- |
| `route.ts`             | Accepts HTTP request, parses body, sends to `checkinController`, returns response |
| `checkinController.ts` | Orchestrates validation, service calls, and error handling                        |
| `checkinValidation.ts` | Validates the `CheckInRequest` payload (manual or with a library)                 |
| `checkinService.ts`    | Core logic: Haversine calc, distance check, inserts check-in                      |
| `checkinDAO.ts`        | Handles all DB interactions using Knex                                            |
| `haversine.ts`         | Standalone utility to compute geographic distances                                |
| `checkinTypes.ts`      | Typed structures: coordinates, payloads, responses                                |

test
