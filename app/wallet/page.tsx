// app/dashboard/my-wallet/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/lib/authOptions";
import { NextResponse } from "next/server";

// Server-side function to fetch the user's wallet and rewards data
export default async function MyWallet() {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   // Redirect to login page if no session (user is not authenticated)
  //   return NextResponse.redirect("/login");
  // }

  // Fetch the wallet and rewards data for the user
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/api/wallet/rewards/${session.user.id}`
  // );
  // const data = await res.json();

  // const rewards = data.rewards || [];
  // const balance = data.balance || 0;

  // Render the wallet page with the rewards and balance data
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Wallet</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Balance</h2>
        <div className="bg-white shadow p-4 rounded-md">
          {/* <p>Your current balance: ${balance}</p> */}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Your Rewards</h2>
        <div className="bg-white shadow p-4 rounded-md">
          {/* {rewards.length === 0 ? (
            <p>No rewards found in your wallet.</p>
          ) : (
            rewards.map((reward: any) => (
              <div key={reward.id} className="flex justify-between mb-4">
                <div>
                  <p className="font-semibold">{reward.name}</p>
                  <p>{reward.description}</p>
                </div>
                <div>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleRedeem(reward.id)}
                  >
                    Redeem
                  </button>
                  <button
                    className="ml-2 bg-green-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleResell(reward.id)}
                  >
                    Resell
                  </button>
                </div>
              </div>
            ))
          )} */}
        </div>
      </section>
    </div>
  );
}

// Redeem reward function
async function handleRedeem(rewardId: string) {
  console.log("Redeeming reward with ID:", rewardId);
  // Perform redemption logic (e.g., API call to mark reward as redeemed)
}

// Resell reward function
async function handleResell(rewardId: string) {
  console.log("Reselling reward with ID:", rewardId);
  // Perform resell logic (e.g., API call to list reward on the marketplace)
}
