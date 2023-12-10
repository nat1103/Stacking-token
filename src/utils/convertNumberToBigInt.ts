
function convertNumberToBigInt(number: number): bigint {
const multipliedNumber = number * 1000000000000000000;
  const bigIntNumber = BigInt(multipliedNumber);
  return bigIntNumber;
}

function convertBigIntToNumber(bigIntNumber: bigint): number {
  const number = Number(bigIntNumber) / 1000000000000000000;
  return number;
}

export { convertNumberToBigInt, convertBigIntToNumber };