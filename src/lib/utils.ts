import { formatFixed } from "@ethersproject/bignumber";
import { uint256 } from "starknet";
import s from "starknet"

export function format(val: any, key: string, decimals: number) {
  if (!val) return null;

  const asBN = uint256.uint256ToBN(val[key]);
  return formatFixed(asBN.toString(), decimals);
}
