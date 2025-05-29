import { nwc } from "@getalby/sdk";

export async function getBalanceService(pairingUri: string) {
  const client = new nwc.NWCClient({ nostrWalletConnectUrl: pairingUri });

  const balance = await client.getBalance();
  return { balance };
}
