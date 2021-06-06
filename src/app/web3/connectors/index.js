import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

import networks from './networks.json';

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  1: process.env.RPC_URL_1,
  4: process.env.RPC_URL_4,
};

const supportedChainIds = networks.map((n) => n.chainId);

export const injected = new InjectedConnector({ supportedChainIds });

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});
