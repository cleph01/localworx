/app
├── /business ← Owner-specific pages (authenticated)
│ └── /profile ← Business owner’s profile/dashboard (protected)
│ └── page.tsx
│
├── /businesses ← Public routes (listings + details)
│ ├── /list ← Directory view (any user, with filters)
│ │ └── page.tsx
│ └── /[businessId] ← Dynamic public detail view
│ └── page.tsx
│
└── layout.tsx ← Wraps everything (SessionProvider, etc.)

### Route Breakdown

| Route                      | Who it's for    | Protected? | Purpose                        |
| -------------------------- | --------------- | ---------- | ------------------------------ |
| `/business/profile`        | Business owners | ✅ Yes     | Manage their own business info |
| `/businesses/list`         | Anyone          | ❌ No      | Discover nearby businesses     |
| `/businesses/[businessId]` | Anyone          | ❌ No      | View public-facing profile     |

You could later add /business/settings, /business/checkins, or /business/analytics as authenticated subroutes if needed.
