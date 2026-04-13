import { NextRequest, NextResponse } from 'next/server';

// Blockscout API for Base Mainnet (free, no API key required, Etherscan-compatible)
const BLOCKSCOUT = 'https://base.blockscout.com/api';

async function fetchTxList(action: string, address: string) {
  const url =
    `${BLOCKSCOUT}?module=account&action=${action}` +
    `&address=${address}&page=1&offset=5&sort=desc`;
  const res = await fetch(url, { cache: 'no-store' });
  return res.json();
}

function pickFirst(data: unknown): Record<string, string> | null {
  const d = data as { status?: string; result?: unknown };
  if (d?.status === '1' && Array.isArray(d?.result) && d.result.length > 0) {
    return d.result[0] as Record<string, string>;
  }
  return null;
}

function pickLatest(
  ...txs: (Record<string, string> | null)[]
): Record<string, string> | null {
  return txs
    .filter((t): t is Record<string, string> => t !== null)
    .sort((a, b) => parseInt(b.timeStamp) - parseInt(a.timeStamp))[0] ?? null;
}

// Extract 4-byte selector from calldata and look up function name via 4byte.directory
async function resolveFunctionName(input: string | undefined): Promise<string> {
  if (!input || input === '0x' || input.length < 10) return '';
  const selector = input.slice(0, 10); // e.g. "0x22c9d06a"
  try {
    const res = await fetch(
      `https://www.4byte.directory/api/v1/signatures/?hex_signature=${selector}`,
      { next: { revalidate: 86400 } }, // cache for 24h — selectors are immutable
    );
    const data = await res.json() as { results?: { text_signature: string }[] };
    return data?.results?.[0]?.text_signature ?? '';
  } catch {
    return '';
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { address: string } }
) {
  const { address } = params;

  try {
    const [normal, internal, token] = await Promise.all([
      fetchTxList('txlist', address),
      fetchTxList('txlistinternal', address),
      fetchTxList('tokentx', address),
    ]);

    const tx = pickLatest(
      pickFirst(normal),
      pickFirst(internal),
      pickFirst(token),
    );

    if (tx && !tx.functionName) {
      tx.functionName = await resolveFunctionName(tx.input);
    }

    return NextResponse.json({ tx });
  } catch (e) {
    return NextResponse.json({ tx: null, error: String(e) });
  }
}
