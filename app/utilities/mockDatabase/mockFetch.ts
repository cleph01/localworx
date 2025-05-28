// utils/mockFetch.ts

import {
  mockUsers,
  mockBusinesses,
  mockPromotions,
  mockRewards,
  mockMarketplace,
  User,
  Business,
  Promotion,
  Reward,
  mockPosts,
  mockPromoterRatings,
  mockZapTransactions,
  mockCheckins,
  mockBitcoinWallets,
} from "./mockDatabase";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

type Method = "GET" | "POST" | "PUT" | "DELETE";

type BodyType = Partial<User | Business | Promotion | Reward>;

interface MockFetchOptions {
  method?: Method;
  body?: BodyType;
}

// Optional generic filter utility
function filterData<T>(data: T[], filters: Record<string, string | null>): T[] {
  return data.filter((item) =>
    Object.entries(filters).every(([key, value]) =>
      value ? item[key as keyof T] === value : true
    )
  );
}

export async function mockFetch(
  endpoint: string,
  options: MockFetchOptions = {}
): Promise<any> {
  await delay(300);

  const method = options.method ?? "GET";

  // Strip query string before splitting
  const [path] = endpoint.split("?");
  const pathParts = path.split("/"); // e.g., ['', 'api', 'rewards']
  const resource = pathParts[2]; // 'rewards'
  const id = pathParts[3]; // 'r1' or undefined

  let db: any[] = [];
  switch (resource) {
    case "users":
      db = mockUsers;
      break;
    case "businesses":
      db = mockBusinesses;
      break;
    case "promotions":
      db = mockPromotions;
      break;
    case "rewards":
      db = mockRewards;
      break;
    case "marketplace":
      db = mockMarketplace;
      break;
    case "posts":
      db = mockPosts;
      break;
    case "promoter-ratings":
      db = mockPromoterRatings;
      break;
    case "zaps":
      db = mockZapTransactions;
      break;
    case "checkins":
      db = mockCheckins;
      break;
    case "bitcoin-wallets":
      db = mockBitcoinWallets;
      break;

    default:
      throw new Error(`Unknown resource: ${resource}`);
  }

  // === GET Logic ===
  if (method === "GET") {
    const queryIndex = endpoint.indexOf("?");
    if (id) {
      const item = db.find((item) => item.id === id);
      return { data: item ?? null };
    }

    if (queryIndex !== -1) {
      const queryString = endpoint.slice(queryIndex);
      const url = new URL("http://localhost" + queryString);
      const filters: Record<string, string | null> = {};

      url.searchParams.forEach((value, key) => {
        filters[key] = value;
      });

      const filtered = filterData(db, filters);
      return { data: filtered };
    }

    return { data: db };
  }

  // === POST Logic ===
  if (method === "POST") {
    const newItem = {
      ...(options.body ?? {}),
      id: `mock-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };

    db.push(newItem);

    // Special response shape for checkins
    if (resource === "checkins") {
      const { businessId, userId }: any = newItem;

      // Count check-ins for this user at this business
      const userCheckins = db.filter(
        (checkin) =>
          checkin.userId === userId && checkin.businessId === businessId
      );

      const userCheckinCount = userCheckins.length;

      // Fetch loyalty reward for this business
      const loyaltyReward = mockRewards.find(
        (reward) =>
          reward.businessId === businessId && reward.type === "loyalty"
      );

      const eligibleForReward = loyaltyReward
        ? userCheckinCount >= parseInt(loyaltyReward.threshold ?? "0")
        : false;

      return {
        data: {
          message: "Check-in recorded.",
          checkin: newItem,
          userCheckinCount,
          eligibleForReward,
        },
      };
    }

    // Default return for all other POSTs
    return { data: newItem };
  }

  // === PUT Logic ===
  if (method === "PUT") {
    if (!id) throw new Error("PUT requires an ID in the URL");

    const index = db.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Item not found");

    db[index] = { ...db[index], ...options.body };
    return { data: db[index] };
  }

  // === DELETE Logic ===
  if (method === "DELETE") {
    if (!id) throw new Error("DELETE requires an ID in the URL");

    const index = db.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Item not found");

    const deleted = db.splice(index, 1)[0];
    return { data: deleted };
  }

  // === Unsupported Method ===
  throw new Error(`Unsupported method: ${method}`);
}
