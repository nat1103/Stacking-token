
function checkAddress(address: string): boolean {
  const regex = /^0x/i;
  return regex.test(address);
}

export default checkAddress;
