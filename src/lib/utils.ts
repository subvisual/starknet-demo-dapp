export function truncate(val: string) {
  return `${val.substring(0, 5)}...${val.slice(-2)}`;
}
