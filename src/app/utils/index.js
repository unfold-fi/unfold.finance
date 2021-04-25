const primaryColor = '#4B58DF';

const truncateAddress = (address, firstSegLength = 7, lastSegLength = 5) => {
  if (!address) return '';
  return address
    ? `${address.slice(0, firstSegLength)}...${address.slice(
        address.length - lastSegLength,
      )}`
    : '...';
};

export { truncateAddress, primaryColor };
