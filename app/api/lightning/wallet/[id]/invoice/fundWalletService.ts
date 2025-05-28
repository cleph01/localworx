// app/api/wallet/[id]/invoice/fundWalletService.ts

/* Mock createInvoice Call */
// export async function createInvoiceForSubwallet(
//   walletId: string,
//   amount: number
// ): Promise<string> {
//   // 👇 Replace this with actual API integration with Alby Jim
//   const mockInvoice = `lnbc${amount}0n1pwxyzpp5...mocked...invoice...${walletId}`;
//   return mockInvoice;
// }

// Real Alby Jim Service Call
// fundWalletService.ts
export async function createInvoiceForSubwallet(
  walletId: string,
  amount: number
): Promise<string> {
  try {
    const response = await fetch(
      `http://localhost:3000/jim/api/v1/wallets/${encodeURIComponent(
        walletId
      )}/invoices`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          unit: "sat",
        }),
      }
    );

    console.log(
      "walletId: ",
      walletId,
      "response @ fundWalletService: ",
      response
    );

    if (!response.ok) {
      throw new Error(`Failed to create invoice: ${response.statusText}`);
    }

    const data = await response.json();
    return data.paymentRequest;
  } catch (error) {
    console.error("Error creating invoice:", error);
    throw error;
  }
}
