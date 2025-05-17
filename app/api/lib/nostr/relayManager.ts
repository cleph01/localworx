// relayManager.ts (SimplePool version)

import {
  SimplePool,
  type Event as NostrEvent,
  type Filter,
  finalizeEvent,
} from "nostr-tools";

// Singleton pool instance shared across calls
const pool = new SimplePool();

// List of connected relay URLs (used for publishing/subscribing)
let connectedRelays: string[] = [];

/**
 * Connects to multiple relays by caching their URLs.
 * The pool itself handles actual connection management.
 */
export function connectToRelays(urls: string[]) {
  connectedRelays = urls;
}

/**
 * Returns list of currently cached relay URLs.
 */
export function getConnectedRelays(): string[] {
  return connectedRelays;
}

/**
 * Publishes a signed event to all connected relays.
 */
export async function publishEvent(
  event: NostrEvent,
  options?: { autoDisconnect?: boolean }
) {
  if (connectedRelays.length === 0) {
    throw new Error("No connected relays. Call connectToRelays() first.");
  }

  await Promise.any(pool.publish(connectedRelays, event));

  if (options?.autoDisconnect) {
    disconnectAll();
  }
}

/**
 * Subscribes to all connected relays with given filters and callback.
 * Automatically disconnects after `timeoutMs` if specified.
 */
export function subscribeToEvent(
  filters: Filter,
  onEvent: (event: NostrEvent) => void,
  options?: { autoDisconnect?: boolean; timeoutMs?: number }
) {
  if (connectedRelays.length === 0) {
    throw new Error("No connected relays.");
  }

  const sub = pool.subscribe(connectedRelays, filters, {
    onevent: onEvent,
  });

  if (options?.autoDisconnect) {
    setTimeout(() => {
      disconnectAll();
    }, options.timeoutMs || 5000);
  }

  return sub; // if you want to manually call unsub later
}

/**
 * Retrieves an event by ID from the first relay that returns it.
 */
export async function getEventById(
  id: string,
  timeoutMs = 5000
): Promise<NostrEvent | null> {
  if (connectedRelays.length === 0) {
    throw new Error("No connected relays.");
  }

  const filter: Filter = { ids: [id] };

  try {
    const event = await pool.get(connectedRelays, filter, {
      maxWait: timeoutMs,
    });
    return event ?? null;
  } catch (e) {
    console.error("getEventById error:", e);
    return null;
  }
}

/**
 * Disconnects from all relays and clears the connection pool.
 */
export function disconnectAll() {
  pool.close(connectedRelays);
  connectedRelays = [];
}
