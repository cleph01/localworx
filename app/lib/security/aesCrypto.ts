import crypto from "crypto";

const keyBase64 = process.env.NEXT_PUBLIC_AES_SECRET_KEY;
if (!keyBase64) throw new Error("Missing AES_SECRET_KEY in environment");

const key = Buffer.from(keyBase64, "base64"); // AES-256 = 32 bytes

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16); // 16-byte IV for AES CBC
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  return Buffer.concat([iv, encrypted]).toString("base64"); // IV + encrypted
}

export function decrypt(base64: string): string {
  const data = Buffer.from(base64, "base64");
  const iv = data.subarray(0, 16);
  const encryptedText = data.subarray(16);
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}

/**
 * 
 * 
 * import { encrypt, decrypt } from "@/lib/security/aesCrypto";

const raw = "nwc:abc123-fake-demo-pairing-uri";
const encrypted = encrypt(raw);
const decrypted = decrypt(encrypted);

console.log("Encrypted:", encrypted);
console.log("Decrypted:", decrypted);

 * 
 * 
 */
