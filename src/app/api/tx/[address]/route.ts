import { NextRequest, NextResponse } from 'next/server';

const BASESCAN = 'https://api.basescan.org/api';

async function fetchTxList(action: string, address: string, apiKey: string) {
  const url =
    `${BASESCAN}?module=account&action=${action}` +
    `&address=${address}&page=1&offset=5&sort=desc` +
    (apiKey ? `&apikey=${apiKey}` : '');
  const res = await fetch(url, { next: { revalidate: 30 } });
  return res.json();
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { address: string } }
) {
  const { address } = params;
  const apiKey = process.env.NEXT_PUBLIC_BASESCAN_API_KEY ?? '';

  try {
    const [normal, internal] = await Promise.all([
      fetchTxList('txlist', address, apiKey),
      fetchTxList('txlistinternal', address, apiKey),
    ]);

    const txNormal =
      normal?.status === '1' && Array.isArray(normal?.result)
        ? normal.result[0] ?? null
        : null;
    const txInternal =
      internal?.status === '1' && Array.isArray(internal?.result)
        ? internal.result[0] ?? null
        : null;

    let tx = null;
    if (txNormal && txInternal) {
      tx =
        parseInt(txNormal.timeStamp) >= parseInt(txInternal.timeStamp)
          ? txNormal
          : txInternal;
    } else {
      tx = txNormal ?? txInternal;
    }

    return NextResponse.json({ tx });
  } catch (e) {
    return NextResponse.json({ tx: null, error: String(e) });
  }
}
