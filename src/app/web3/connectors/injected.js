import { InjectedConnector } from '@web3-react/injected-connector';

// eslint-disable-next-line import/prefer-default-export
export default new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});
