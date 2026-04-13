import { NextRequest, NextResponse } from 'next/server';

// Blockscout API for Base Mainnet (free, no API key required, Etherscan-compatible)
const BLOCKSCOUT = 'https://base.blockscout.com/api';

// Exclude txs sent to this miniapp's own contract
const OWN_CONTRACT = (
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? ''
).toLowerCase();

async function fetchTxList(action: string, address: string) {
  const url =
    `${BLOCKSCOUT}?module=account&action=${action}` +
    `&address=${address}&page=1&offset=10&sort=desc`;
  const res = await fetch(url, { cache: 'no-store' });
  return res.json();
}

function extractTxList(data: unknown): Record<string, string>[] {
  const d = data as { status?: string; result?: unknown };
  if (d?.status === '1' && Array.isArray(d?.result)) {
    return d.result as Record<string, string>[];
  }
  return [];
}

function pickLatest(
  lists: Record<string, string>[][],
): Record<string, string> | null {
  return lists
    .flat()
    .filter((t) => t.to?.toLowerCase() !== OWN_CONTRACT)
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

    const tx = pickLatest([
      extractTxList(normal),
      extractTxList(internal),
      extractTxList(token),
    ]);

    if (tx && !tx.functionName) {
      tx.functionName = await resolveFunctionName(tx.input);
    }

    return NextResponse.json({ tx });
  } catch (e) {
    return NextResponse.json({ tx: null, error: String(e) });
  }
}
