import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import styled, { css, keyframes } from 'styled-components';

import {
  approveTokenRequest,
  depositTokenRequest,
  withdrawTokenRequest,
} from '../../store/slices/web3';
import PrimaryButton from '../primaryButton';
import config from '../../../config';

import { toFixed } from '../../utils';

const VaultView = ({
  className,
  name,
  desc,
  tokenSymbol,
  tokenAddress,
  tokenAbi,
  vaultAddress,
  vaultAbi,
  enabled,
}) => {
  const dispatch = useDispatch();
  let buttonText = enabled ? 'Approve' : 'Soon';
  let apy = 0;
  let locked = 0;
  let stake = 0;
  let reward = 0;
  let approved = false;
  const amount = 1;

  const vault = {
    name,
    tokenSymbol,
    tokenAddress,
    tokenAbi,
    vaultAddress,
    vaultAbi,
  };

  const { vaults, loading } = useSelector((state) => state.web3);
  const { library } = useWeb3React();

  if (enabled) {
    const vaultState = vaults[name];
    locked = vaultState.locked;
    stake = vaultState.stake;
    reward = vaultState.reward;
    approved = vaultState.approved;
  }

  const handleApproveClick = () => {
    dispatch(approveTokenRequest({ vault, library }));
  };

  const handleDepositClick = () => {
    dispatch(depositTokenRequest({ vault, amount, library }));
  };

  const handleWithdrawClick = () => {
    dispatch(withdrawTokenRequest({ vault, amount, library }));
  };

  return (
    <Container className={className} $loading={loading}>
      <VaultCard.TextContainer>
        <VaultCard.Title>{name}</VaultCard.Title>
        <VaultCard.Desc>{desc}</VaultCard.Desc>
      </VaultCard.TextContainer>
      <VaultCard.MetaContainer>
        <VaultCard.Meta>APY: {toFixed(apy, 2)}%</VaultCard.Meta>
        <VaultCard.Meta>
          Locked: {toFixed(locked, 4)} {tokenSymbol}
        </VaultCard.Meta>
        <VaultCard.Meta>
          Your stake: {toFixed(stake, 4)} {tokenSymbol}
        </VaultCard.Meta>
        <VaultCard.Meta>
          Reward: {toFixed(reward, 4)} {config.Contracts.ERC20.tokenSymbol}
        </VaultCard.Meta>
      </VaultCard.MetaContainer>
      {!enabled && (
        <PrimaryButton sx={{ type: 'outline' }} enabled={false}>
          Soon
        </PrimaryButton>
      )}
      {enabled && !approved && (
        <PrimaryButton sx={{ type: 'outline' }} onClick={handleApproveClick}>
          Approve
        </PrimaryButton>
      )}
      {enabled && approved && (
        <ButtonContainer>
          <PrimaryButtonWrapper
            sx={{ type: 'outline' }}
            onClick={handleDepositClick}
          >
            Deposit
          </PrimaryButtonWrapper>
          <PrimaryButtonWrapper
            sx={{ type: 'outline' }}
            onClick={handleWithdrawClick}
          >
            Withdraw
          </PrimaryButtonWrapper>
        </ButtonContainer>
      )}
    </Container>
  );
};

const Shown = keyframes`
  from { 
    opacity: 0;
    transform: translateX(-0.625rem);
  }
`;

const pulse = keyframes`
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 0.2;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 15rem;
  height: 19.375rem;
  border: 1px solid #e5e5df;
  border-radius: 0.375rem;

  padding: 1.875rem;
  justify-content: space-between;

  ${(props) =>
    props.$loading &&
    css`
      animation: ${pulse} 1s infinite alternate;
    `}
`;

const VaultCard = {
  TextContainer: styled.div``,
  Title: styled.div`
    font-size: 1.125rem;
    font-weight: 500;
  `,
  Desc: styled.div`
    font-size: 0.875rem;
    margin-top: 0.75rem;
  `,
  MetaContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex-grow: 1;
    justify-content: flex-end;
    margin-bottom: 1.875rem;
  `,

  Meta: styled.div`
    font-size: 0.875rem;
  `,
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.625rem;
`;

const PrimaryButtonWrapper = styled(PrimaryButton)`
  min-width: unset;
  flex: 1 1 0;
`;

export default VaultView;
