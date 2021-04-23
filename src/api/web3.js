import { ethers } from 'ethers';
import makeBlockie from 'ethereum-blockies-base64';

import { ApiError, ErrorCodes } from './index';

const getUserData = async ({ account }, provider) => {
  try {
    const image = makeBlockie(account);
    const ethB = await provider.getBalance(account);
    const ethBalance = ethers.utils.formatEther(ethB).toString();

    return {
      account,
      image,
      ethBalance,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      return Promise.reject(error);
    }
    return Promise.reject(new ApiError(ErrorCodes.BLOCKCHAIN, error.message));
  }
};

const Web3Api = {
  getUserData,
};

export default Web3Api;
