import { encrypt } from "@/app/lib/security/aesCrypto";

export function encryptPairingUri(uri: string): string {
  const encrypted = encrypt(uri);
  if (!encrypted) throw new Error("Failed to encrypt pairing URI");
  return encrypted;
}
