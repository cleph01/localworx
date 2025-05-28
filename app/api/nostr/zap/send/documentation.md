API Contract
POST /api/zap/send

Input JSON body:
{
amount: number; // in millisats
lud16?: string; // e.g. "bob@localworx.io"
lnurl?: string; // fallback if no lud16
senderPubkey: string;
targetPubkey: string;
eventId: string; // the post or content being zapped
zapRequest: string; // signed ZapRequest event (as JSON string)
}

Returns:
{
invoice: string;
callback: string;
}

User Flow when initiating a Zap:

1. User clicks “Zap” → signs ZapRequest
2. You call `/api/zap/send`
3. Show modal:
   - 🎯 QR code for invoice
   - 🔁 WebLN pay button (if available)
   - 📋 Copy invoice button
4. Show “Thank you” message or zap count once paid

---

Perfect — these three features will really level up the Zap experience and bring LocalWorx's lightning-powered engine to life.

---

## ⚙️ Feature Roadmap

Let’s implement each feature modularly:

---

### ✅ **1. Zap Success Detection**

We’ll add **one or both** methods:

- **Polling method (short-term MVP):** Poll the `lnurl/callback` invoice for payment status
- **Nostr method (ideal):** Listen for `kind: 9735` Zap Receipt events via Nostr relay

**Goal:** Confirm payment, close modal, and show success feedback

---

### ✅ **2. Zap Totals Tracker**

- Count total sats zapped to a `pubkey` or event (`eventId`)
- Display this under a business post, profile, or content item
- Uses Nostr to fetch `kind: 9735` events with `["p", pubkey]` and `["e", eventId]` tags
- Optional: store zaps in your backend for performance or analytics

---

### ✅ **3. Lightning Address Balance Integration**

- Query the **LNbits API** or Alby Hub (via `invoice_key`) to check subwallet balance
- Display “Your balance: 1,230 sats” under dashboard/profile
- Optional: Show “Fund this wallet” QR if balance is low

---

## 📦 Tools You’ll Use

| Feature         | Tool                                                     |
| --------------- | -------------------------------------------------------- |
| Zap receipts    | `nostr-tools` + `SimplePool` for subscribing to events   |
| Invoice polling | Simple `fetch` loop                                      |
| Balance check   | LNbits or Alby Hub API using subwallet ID or invoice key |

---

## 🧱 Suggested Build Order

1. ✅ **Start with invoice polling** (easy, works now)
2. ✅ Add Nostr zap receipt listener
3. ✅ Add zap totals tracker UI
4. ✅ Fetch and display wallet balance (from LNbits or Jim-compatible endpoint)

---

Would you like me to start with feature #1 (Zap success detection via invoice polling), and scaffold the update to the existing modal logic now?
