import { NextResponse } from "next/server";

// Quick connectivity check — confirms LNBITS_URL and LNBITS_ADMIN_KEY are set
// and that the LNbits instance is reachable and the key is valid.
export async function GET() {
  const url = process.env.LNBITS_URL;
  const key = process.env.LNBITS_ADMIN_KEY;

  if (!url || !key) {
    return NextResponse.json(
      { ok: false, error: "LNBITS_URL or LNBITS_ADMIN_KEY is not set" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/api/v1/wallet`, {
      headers: {
        "X-Api-Key": key,
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      const body = await res.text();
      return NextResponse.json(
        { ok: false, error: `LNbits responded ${res.status}: ${body}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json({
      ok: true,
      lnbits_url: url,
      wallet_name: data.name,
      balance_sats: Math.floor((data.balance ?? 0) / 1000),
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 502 }
    );
  }
}
