export function roundToDecimal(number: any, decimals: number): number {
  const multiplier = 10 ** decimals;
  return Math.round(number * multiplier) / multiplier;
}
