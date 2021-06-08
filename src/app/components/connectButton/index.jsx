import React from 'react';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';

import styled from 'styled-components';

import { truncateAddress, CONSTANTS } from '../../utils';

import PrimaryButton from '../primaryButton';
import { showModal } from '../../store/slices/connection';

const ConnectButtonComponent = ({ className }) => {
  const dispatch = useDispatch();

  const { account } = useWeb3React();

  const handleClick = async () => {
    dispatch(showModal());
  };

  return (
    <Wrapper className={className}>
      {account && (
        <Profile.Wrapper>
          <Profile.Address onClick={handleClick}>
            {truncateAddress(account)}
          </Profile.Address>
        </Profile.Wrapper>
      )}
      {!account && (
        <ConnectButtonWrapper>
          <ConnectButton
            sx={{ type: 'outline', small: true }}
            onClick={handleClick}
          >
            Connect Wallet
          </ConnectButton>
        </ConnectButtonWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const ConnectButtonWrapper = styled.div`
  /* display: grid;
  justify-content: end;
  align-content: center;
  @media (max-width: 48rem) {
    margin-bottom: 0.625rem;
  } */
`;
const ConnectButton = styled(PrimaryButton)``;

const Profile = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;
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

export default ConnectButtonComponent;
