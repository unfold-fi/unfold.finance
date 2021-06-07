import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import styled, { css, keyframes } from 'styled-components';

import { approveTokenRequest, getRewardRequest } from '../../store/slices/web3';
import PrimaryButton from '../primaryButton';
import config from '../../../config';

import { toFixed } from '../../utils';

import { ModalType, showModal } from '../../store/slices/modal';

const VaultView = ({
  className,
  name,
  logo,
  desc,
  tokenSymbol,
  tokenAddress,
  tokenAbi,
  vaultAddress,
  vaultAbi,
  enabled,
}) => {
  const dispatch = useDispatch();
  let apy = 0;
  let locked = 0;
  let stake = 0;
  let balance = 0;
  let reward = 0;
  let approved = false;

  const vault = {
    name,
    logo,
    tokenSymbol,
    tokenAddress,
    tokenAbi,
    vaultAddress,
    vaultAbi,
  };

  const { vaults, loading } = useSelector((state) => state.web3);
  const { account, library } = useWeb3React();

  if (enabled) {
    const vaultState = vaults[name];
    locked = vaultState.locked;
    stake = vaultState.stake;
    balance = vaultState.balance;
    reward = vaultState.reward;
    approved = vaultState.approved;
  }

  const handleApproveClick = () => {
    dispatch(approveTokenRequest({ vault, library }));
  };

  const handleDepositClick = () => {
    dispatch(
      showModal({
        type: ModalType.DEPOSIT,
        symbol: vault.tokenSymbol,
        balance: balance,
        vault,
      }),
    );
  };

  const handleWithdrawClick = () => {
    dispatch(
      showModal({
        type: ModalType.WITHDRAW,
        symbol: vault.tokenSymbol,
        balance: stake,
        vault,
      }),
    );
  };

  const handleClaimClick = () => {
    dispatch(getRewardRequest({ vault, library }));
  };

  return (
    <Container className={className} $loading={loading}>
      <VaultCard.TextContainer>
        <VaultCard.Title>
          {vault.logo && <VaultCard.Logo src={vault.logo} />}
          {name}
        </VaultCard.Title>
        <VaultCard.Desc>{desc}</VaultCard.Desc>
      </VaultCard.TextContainer>
      <VaultCard.MetaContainer>
        {/* <VaultCard.Meta>APY: {toFixed(apy, 2)}%</VaultCard.Meta> */}
        <VaultCard.Meta>
          Locked: {toFixed(locked, 2)} {tokenSymbol}
        </VaultCard.Meta>
        <VaultCard.Meta>
          Your stake: {toFixed(stake, 2)} {tokenSymbol}
        </VaultCard.Meta>
        <VaultCard.RewardContainer>
          <VaultCard.RewardText>
            Reward: {toFixed(reward, 0)} {config.Contracts.ERC20.tokenSymbol}
          </VaultCard.RewardText>
          {Number(reward) > 0 && (
            <VaultCard.RewardButton onClick={handleClaimClick}>
              Claim
            </VaultCard.RewardButton>
          )}
        </VaultCard.RewardContainer>
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
            onClick={Number(stake) > 0 ? handleWithdrawClick : () => {}}
            enabled={Number(stake) > 0}
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

  @media (max-width: 30rem) {
    width: auto;
    max-width: 100%;
  }

  ${(props) =>
    props.$loading &&
    css`
      animation: ${pulse} 1s infinite alternate;
    `}
`;

const VaultCard = {
  TextContainer: styled.div``,
  Title: styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 1.125rem;
    font-weight: 500;
  `,
  Logo: styled.img`
    width: 32px;
    height: 32px;
  `,
  Desc: styled.div`
    font-size: 0.875rem;
    margin-top: 0.75rem;
  `,
  MetaContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    flex-grow: 1;
    justify-content: flex-end;
  `,

  Meta: styled.div`
    font-size: 0.875rem;
    @media (max-width: 48rem) {
      font-size: 0.75rem;
    }
  `,

  RewardContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 1.875rem;
    gap: 0.625rem;
    align-items: center;
  `,

  RewardText: styled.div`
    font-size: 0.875rem;
    @media (max-width: 48rem) {
      font-size: 0.75rem;
    }
  `,

  RewardButton: styled.div`
    background: #0e1239;
    color: white;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
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
