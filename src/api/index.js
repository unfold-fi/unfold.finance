export const ErrorCodes = {
  Unauthorized: 401,
  NOTFOUND: 404,
  UNPROCESSABLE: 422,
  UNSPECIFIED: 0,
  BLOCKCHAIN: 9999,
};

export class ApiError extends Error {
  status;

  statusText;

  constructor(status, statusText) {
    super(statusText);
    this.status = status;

    let text = statusText;

    if (status === ErrorCodes.BLOCKCHAIN) {
      if (text.includes("Cannot read property 'getSigner' of undefined")) {
        text = 'Please ensure that you selected correct Ethereum network';
      }
      if (text.includes('underlying network changed')) {
        text = 'Please ensure that you selected correct Ethereum network';
      }
      if (text.includes('User denied transaction signature')) {
        text = 'Signature request rejected';
      }
      if (text.includes('invalid decimal value')) {
        text = 'Stake/Unstake amount invalid decimal value';
      }
      if (text.includes('replacement fee too low')) {
        text = 'Check pending transactions, replacement tx fee too low';
      }
      if (text.includes('cannot estimate gas')) {
        text = 'Cannot estimate gas, most likely transaction will fail';
      }
      if (text.includes('call revert exception')) {
        text = 'Please ensure that you selected correct Ethereum network';
      }
    }
    this.statusText = text;
  }
}
