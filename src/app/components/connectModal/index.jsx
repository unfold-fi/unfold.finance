import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';

import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector';
import styled, { keyframes } from 'styled-components';

import PrimaryButton from '../primaryButton';
import Spinner from '../spinner';
import { injected, walletconnect } from '../../web3/connectors';
import { useEagerConnect, useInactiveListener } from '../../web3';

import MetamaskIcon from '../../assets/metamask-fox.png';
import WalletConnectIcon from '../../assets/walletconnect-circle-blue.png';

import { useClickOutside } from '../../hooks';
import { closeModal } from '../../store/slices/connection';
import { showError } from '../../store/slices/alert';
import config from '../../../config';

const ConnectModalView = ({ className }) => {
  const { connector, active, activate, deactivate, error } = useWeb3React();

  const { modalOpen } = useSelector((state) => state.connection);

  const dispatch = useDispatch();
  const connectionModalRef = useRef(null);

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  useClickOutside(connectionModalRef, () => {
    if (modalOpen) {
      dispatch(closeModal());
    }
  });

  const handleCloseModalClick = () => {
    dispatch(closeModal());
  };

  const connectors = [
    {
      name: 'Metamask',
      icon: MetamaskIcon,
      connector: injected,
    },
    {
      name: 'Wallect Connect',
      icon: WalletConnectIcon,
      connector: walletconnect,
    },
  ];

  const handleDisconnectClick = () => {
    if (active) {
      deactivate();
    }
  };

  // Error handling
  const getErrorMessage = (error) => {
    if (error instanceof NoEthereumProviderError) {
      return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
    } else if (error instanceof UnsupportedChainIdError) {
      return `You're connected to an unsupported network. Please switch network to ${
        config.supportedChainName || 'Mainnet'
      }.`;
    } else if (
      error instanceof UserRejectedRequestErrorInjected ||
      error instanceof UserRejectedRequestErrorWalletConnect
    ) {
      return 'Please authorize this website to access your Ethereum account.';
    } else {
      console.error(error);
      return 'An unknown error occurred. Check the console for more details.';
    }
  };

  useEffect(() => {
    if (error) {
      deactivate();
      dispatch(showError(getErrorMessage(error)));
    }
  }, [deactivate, dispatch, error]);

  return (
    <Backdrop className={className} show={modalOpen}>
      <Modal.Container ref={connectionModalRef}>
        <Modal.HeaderContainer>
          <Modal.Title>Connect Wallet</Modal.Title>
          <Modal.Close onClick={handleCloseModalClick}>&#10005;</Modal.Close>
        </Modal.HeaderContainer>
        <Modal.ContentContainer>
          {connectors.map((item) => {
            const currentConnector = item.connector;
            const activating = currentConnector === activatingConnector;
            const connected = currentConnector === connector;
            return (
              <Connector.Wrapper
                connected={connected}
                key={item.name}
                onClick={() => {
                  setActivatingConnector(currentConnector);
                  activate(item.connector);
                }}
              >
                {activating && (
                  <Spinner
                    color={'blue'}
                    style={{ position: 'absolute', right: '2.1875rem' }}
                  />
                )}
                <Connector.Icon src={item.icon} alt={item.name} />
                <Connector.Title>{item.name}</Connector.Title>
                <Connector.Status>
                  {connected && (
                    <span role="img" aria-label="check">
                      ✔️
                    </span>
                  )}
                </Connector.Status>
              </Connector.Wrapper>
            );
          })}
        </Modal.ContentContainer>
        <Modal.Action>
          <DisconnectButton
            sx={{ type: 'outline' }}
            onClick={handleDisconnectClick}
            disabled={!active}
          >
            Disconnect
          </DisconnectButton>
        </Modal.Action>
      </Modal.Container>
    </Backdrop>
  );
};

const Shown = keyframes`
  from { 
    opacity: 0;
  }
`;

const Backdrop = styled.div`
  ${(prop) => (prop.show ? `display: flex;` : `display: none;`)}
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  justify-content: center;
  align-items: center;
  animation: ${Shown} 0.2s ease;
`;
const Modal = {
  Container: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;

    width: 18.75rem;
    height: 23.4375rem;
    border: 1px solid #e5e5df;
    border-radius: 0.375rem;
    background-color: white;

    padding: 1.5625rem;
    justify-content: space-between;
  `,
  HeaderContainer: styled.div``,

  Title: styled.div`
    font-size: 1.125rem;
    font-weight: 500;
  `,
  Close: styled.div`
    position: absolute;
    right: 0.625rem;
    top: 0.625rem;
    font-size: 1rem;
    cursor: pointer;
  `,
  ContentContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding-top: 1.875rem;
    flex-grow: 1;
    justify-content: start;
    margin-bottom: 1.875rem;
  `,

  Action: styled.div`
    display: flex;
    gap: 10px;
    && button {
      width: 100%;
    }
  `,
};

const Connector = {
  Wrapper: styled.div`
    display: flex;
    padding: 0.625rem 1.25rem;
    border: 1px solid #e5e5df;
    ${(prop) =>
      prop.connected ? `border-color: green;` : `border-color: #e5e5df;`}
    border-radius: 0.375rem;
    align-items: center;
    gap: 1.25rem;
    cursor: pointer;
  `,
  Icon: styled.img`
    width: 2rem;
    height: 2rem;
  `,
  Title: styled.div`
    flex-grow: 1;
  `,
  Status: styled.div``,
};

const DisconnectButton = styled(PrimaryButton)``;

export default ConnectModalView;
