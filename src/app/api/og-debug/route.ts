import { NextRequest, NextResponse } from 'next/server';

const RPC = process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org';
const CONTRACT = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x2966a0eFA55F03F86Dd2736c25Ef76300B9c07D9';

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get('addr') ?? '';

  const selector = '0x0f53a470';
  const padded = address.replace('0x', '').toLowerCase().padStart(64, '0');
  const data = selector + padded;

  try {
    const res = await fetch(RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_call',
        params: [{ to: CONTRACT, data }, 'latest'],
        id: 1,
      }),
      cache: 'no-store',
    });
    const raw = await res.text();
    const json = JSON.parse(raw);
    return NextResponse.json({ address, contract: CONTRACT, rpc: RPC, result: json });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
