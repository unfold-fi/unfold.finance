import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import styled, { keyframes } from 'styled-components';

import PrimaryButton from '../primaryButton';

const PoolView = ({ className }) => {
  const history = useHistory();

  return (
    <Container className={className}>
      <PoolCard.TextContainer>
        <PoolCard.Title>ETH Vault</PoolCard.Title>
        <PoolCard.Desc>Supply ETH and earn UNF</PoolCard.Desc>
      </PoolCard.TextContainer>
      <PoolCard.MetaContainer>
        <PoolCard.Meta>APY: 78.36%</PoolCard.Meta>
        <PoolCard.Meta>Liquidity: 1,683,200.125 ETH</PoolCard.Meta>
        <PoolCard.Meta>Your stake: 0.00 ETH</PoolCard.Meta>
        <PoolCard.Meta>Reward: 0.0000 UNF</PoolCard.Meta>
      </PoolCard.MetaContainer>
      <PrimaryButton sx={{ type: 'outline' }}>Approve</PrimaryButton>
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

const PoolCard = {
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

export default PoolView;
