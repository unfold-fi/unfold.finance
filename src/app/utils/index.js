const CONSTANTS = {
  primaryColor: '#4B58DF',
  primaryColorHover: '#3746E0',
};

const truncateAddress = (address, firstSegLength = 7, lastSegLength = 5) => {
  if (!address) return '';
  return address
    ? `${address.slice(0, firstSegLength)}...${address.slice(
        address.length - lastSegLength,
      )}`
    : '...';
};

const toFixed = (value, decimals) => {
  if (!value) value = 0;

  return Number(value).toFixed(decimals);
};

const toFixedDown = (value, decimals) => {
  if (!value) value = 0;

  return Number(
    `${Math.floor(Number(`${value}e${decimals}`))}e-${decimals}`,
  ).toString();
};

export { CONSTANTS, truncateAddress, toFixed, toFixedDown };
