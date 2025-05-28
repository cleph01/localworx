// global.d.ts

export {};

declare global {
  interface Window {
    nostr?: {
      getPublicKey: () => Promise<string>;
      signEvent: (event: any) => Promise<any>;
    };
    webln?: {
      enable: () => Promise<void>;
      sendPayment: (paymentRequest: string) => Promise<any>;
    };
  }
}
