import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

import config from '../../../config';

const POLLING_INTERVAL = 12000;

const RPC_URLS = {
  1: process.env.RPC_URL_1,
};

export const injected = new InjectedConnector({
  supportedChainIds: config.supportedChainIds,
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});
