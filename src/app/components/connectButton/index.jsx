import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';

import styled from 'styled-components';

import { truncateAddress, CONSTANTS } from '../../utils';

import PrimaryButton from '../primaryButton';
import ConnectModal from '../connectModal';

const ConnectButtonComponent = ({ className, mobile }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { account } = useWeb3React();

  const handleClick = async () => {
    setModalOpen(true);
    // if (account) {
    //   deactivate();
    // } else {
    //   await activate(injectedConnector);
    // }
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const MOBILE = (
    <>
      <ConnectModal open={modalOpen} onClose={handleModalClose} />
      {account && (
        <Profile.Address onClick={handleClick}>
          {truncateAddress(account)}
        </Profile.Address>
      )}
      {!account && (
        <MobileConnectButton sx={{ type: 'outline' }} onClick={handleClick}>
          Connect Wallet
        </MobileConnectButton>
      )}
    </>
  );

  const DESKTOP = (
    <>
      <ConnectModal open={modalOpen} onClose={handleModalClose} />
      {account && (
        <Profile.Wrapper>
          <Profile.Address onClick={handleClick}>
            {truncateAddress(account)}
          </Profile.Address>
        </Profile.Wrapper>
      )}
      {!account && (
        <ConnectButtonWrapper>
          <ConnectButton sx={{ type: 'outline' }} onClick={handleClick}>
            Connect Wallet
          </ConnectButton>
        </ConnectButtonWrapper>
      )}
    </>
  );

  return mobile ? MOBILE : DESKTOP;
};

const ConnectButtonWrapper = styled.div`
  display: grid;
  justify-content: end;
  align-content: center;
  @media (max-width: 48rem) {
    display: none;
  }
`;
const ConnectButton = styled(PrimaryButton)``;

const Profile = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;
    @media (max-width: 48rem) {
      display: none;
    }
  `,

  Address: styled.div`
    padding: 0.6875rem 1rem;
    border: 1px solid ${CONSTANTS.primaryColor};
    border-radius: 0.375rem;
    color: ${CONSTANTS.primaryColor};
    font-size: 0.875rem;
    cursor: pointer;
  `,
};

const MobileConnectButton = styled(PrimaryButton)`
  margin-bottom: 0.625rem;
`;

export default ConnectButtonComponent;
