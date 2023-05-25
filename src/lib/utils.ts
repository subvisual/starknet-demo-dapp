import { formatFixed } from "@ethersproject/bignumber";
import { uint256 } from "starknet";

export function format(val: any, key: string, decimals: number) {
  if (!val) return null;

  const asBN = uint256.uint256ToBN(val[key]);
  return formatFixed(asBN.toString(), decimals);
}

export function truncate(val: string) {
  return `${val.substring(0, 5)}...${val.slice(-2)}`;
}
