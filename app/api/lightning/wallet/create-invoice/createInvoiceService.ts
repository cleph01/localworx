import { nwc } from "@getalby/sdk";
import { validateZapRequest } from "nostr-tools/nip57";
import type { Event } from "nostr-tools";

export async function createInvoiceService({
  pairingUri,
  amount,
  memo = "LocalWorx Funding",
  zapRequestRaw,
}: {
  pairingUri: string;
  amount: number;
  memo?: string;
  zapRequestRaw?: string;
}) {
  const client = new nwc.NWCClient({ nostrWalletConnectUrl: pairingUri });

  let metadata: { nostr?: { pubkey: string; tags: string[][] } } | undefined;

  if (zapRequestRaw) {
    const zapValidationError = validateZapRequest(zapRequestRaw);
    if (zapValidationError) {
      throw new Error(zapValidationError);
    }

    const parsedZap: Event = JSON.parse(zapRequestRaw);
    metadata = {
      nostr: {
        pubkey: parsedZap.pubkey,
        tags: parsedZap.tags,
      },
    };
  }

  const invoice = await client.makeInvoice({
    amount,
    description: memo,
    metadata,
  });

  return { invoice };
}
