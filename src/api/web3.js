import { ethers } from 'ethers';
import makeBlockie from 'ethereum-blockies-base64';

import { ApiError, ErrorCodes } from './index';

import config from '../config';

const getUserData = async ({ account }, provider) => {
  try {
    const image = makeBlockie(account);
    const ethB = await provider.getBalance(account);
    const ethBalance = ethers.utils.formatEther(ethB).toString();

    const vaults = [];
    for (const vault of config.Vaults) {
      if (vault.enabled) {
        const token = new ethers.Contract(
          vault.tokenAddress,
          vault.tokenAbi,
          provider,
        );
        const vaultContract = new ethers.Contract(
          vault.vaultAddress,
          vault.vaultAbi,
          provider,
        );
        const allowance = await token.allowance(account, vault.vaultAddress);
        const balance = await token.balanceOf(account);
        const locked = await vaultContract.totalSupply();
        const stake = await vaultContract.balanceOf(account);
        const reward = await vaultContract.earned(account);

        vaults.push({
          name: vault.name,
          locked: ethers.utils.formatEther(locked),
          stake: ethers.utils.formatEther(stake),
          balance: ethers.utils.formatEther(balance),
          reward: ethers.utils.formatEther(reward),
          approved: allowance.gt(0),
        });
      }
    }

    return {
      account,
      image,
      ethBalance,
      vaults,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      return Promise.reject(error);
    }
    return Promise.reject(new ApiError(ErrorCodes.BLOCKCHAIN, error.message));
  }
};

const approveTokenTx = async ({ account, vault }, provider) => {
  try {
    const signer = await provider.getSigner(account);

    const ercContract = new ethers.Contract(
      vault.tokenAddress,
      vault.tokenAbi,
      signer,
    );

    const result = await ercContract.approve(
      vault.vaultAddress,
      ethers.constants.MaxUint256,
    );

    return {
      tx: result,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return Promise.reject(error);
    }
    return Promise.reject(new ApiError(ErrorCodes.BLOCKCHAIN, error.message));
  }
};

const depositTokenTx = async ({ account, vault, amount }, provider) => {
  try {
    const signer = await provider.getSigner(account);

    const ercContract = new ethers.Contract(
      vault.tokenAddress,
      vault.tokenAbi,
      provider,
    );
    const decimals = Number(await ercContract.decimals());

    const stakeB = ethers.utils.parseUnits(String(amount), decimals);

    const poolContract = new ethers.Contract(
      vault.vaultAddress,
      vault.vaultAbi,
      signer,
    );

    const result = await poolContract.stake(stakeB);

    return {
      tx: result,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      return Promise.reject(error);
    }
    return Promise.reject(new ApiError(ErrorCodes.BLOCKCHAIN, error.message));
  }
};

const withdrawTokenTx = async ({ account, vault, amount }, provider) => {
  try {
    const signer = await provider.getSigner(account);

    const ercContract = new ethers.Contract(
      vault.tokenAddress,
      vault.tokenAbi,
      provider,
    );
    const decimals = Number(await ercContract.decimals());

    const unstakeB = ethers.utils.parseUnits(String(amount), decimals);

    const poolContract = new ethers.Contract(
      vault.vaultAddress,
      vault.vaultAbi,
      signer,
    );

    const result = await poolContract.withdraw(unstakeB, unstakeB);

    return {
      tx: result,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      return Promise.reject(error);
    }
    return Promise.reject(new ApiError(ErrorCodes.BLOCKCHAIN, error.message));
  }
};

const exitTokenTx = async ({ account, vault }, provider) => {
  try {
    const signer = await provider.getSigner(account);

    const poolContract = new ethers.Contract(
      vault.vaultAddress,
      vault.vaultAbi,
      signer,
    );

    const result = await poolContract.exit();

    return {
      tx: result,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      return Promise.reject(error);
    }
    return Promise.reject(new ApiError(ErrorCodes.BLOCKCHAIN, error.message));
  }
};

const getRewardTx = async ({ account, vault }, provider) => {
  try {
    const signer = await provider.getSigner(account);

    const poolContract = new ethers.Contract(
      vault.vaultAddress,
      vault.vaultAbi,
      signer,
    );

    const result = await poolContract.getReward();

    return {
      tx: result,
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
  approveTokenTx,
  depositTokenTx,
  withdrawTokenTx,
  exitTokenTx,
  getRewardTx,
};

export default Web3Api;
