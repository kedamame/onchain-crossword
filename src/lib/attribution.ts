import { concatHex, encodeFunctionData, type Hex } from 'viem';
import { ABI, CONTRACT_ADDRESS } from './contract';

// Paste your Base Build builder code here after registering at dashboard.base.org
const BUILDER_CODE = process.env.NEXT_PUBLIC_BUILDER_CODE || '';

function getBuilderSuffix(): Hex | undefined {
  if (!BUILDER_CODE) return undefined;
  try {
    // ox/erc8021 Attribution.toDataSuffix
    const { Attribution } = require('ox/erc8021');
    return Attribution.toDataSuffix({ codes: [BUILDER_CODE] }) as Hex;
  } catch {
    return undefined;
  }
}

const BUILDER_SUFFIX = getBuilderSuffix();

export function encodeWithAttribution(
  functionName: string,
  args: readonly unknown[]
): { to: typeof CONTRACT_ADDRESS; data: Hex } {
  const calldata = encodeFunctionData({
    abi: ABI,
    functionName,
    args,
  } as Parameters<typeof encodeFunctionData>[0]);

  return {
    to: CONTRACT_ADDRESS,
    data: BUILDER_SUFFIX ? concatHex([calldata, BUILDER_SUFFIX]) : calldata,
  };
}
