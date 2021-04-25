import React, { useCallback } from 'react';

import styled, { keyframes } from 'styled-components';

import PrimaryButton from '../primaryButton';
import config from '../../../config';

import { toFixed } from '../../utils';

const VaultView = ({ className, name, desc, enabled, tokenSymbol }) => {
  const buttonText = enabled ? 'Approve' : 'Soon';
  const apy = '78.36';
  const locked = '1683200.125';
  const stake = '0.00';
  const reward = '0.0000';
  return (
    <Container className={className}>
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
          Reward: {toFixed(reward, 4)} {config.TokenSymbol}
        </VaultCard.Meta>
      </VaultCard.MetaContainer>
      <PrimaryButton sx={{ type: 'outline' }} enabled={enabled}>
        {buttonText}
      </PrimaryButton>
    </Container>
  );
};

const Shown = keyframes`
  from { 
    opacity: 0;
    transform: translateX(-0.625rem);
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

  animation: ${Shown} 1s ease;
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

export default VaultView;
