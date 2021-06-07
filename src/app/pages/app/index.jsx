import * as React from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';

import VaultCard from '../../components/vault';

import config from '../../../config';
import ConnectButton from '../../components/connectButton';

const AppPage = () => {
  const { account } = useWeb3React();
  return (
    <Container>
      <Heading>Stake</Heading>
      <Vault.Grid>
        {account &&
          config.Vaults.map((vault, index) => {
            return <VaultCard key={index} {...vault} />;
          })}
        {!account && <ConnectButton />}
      </Vault.Grid>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
`;
const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
  margin-top: 2.5rem;
  @media (max-width: 48rem) {
    margin-top: 1.25rem;
    font-size: 1.125rem;
  }
`;

const Vault = {
  Grid: styled.div`
    display: grid;
    grid-template-columns: repeat(3, auto);
    row-gap: 3.125rem;
    margin-top: 1.875rem;
    justify-content: space-between;
    @media (max-width: 59.625rem) {
      grid-template-columns: repeat(2, auto);
      justify-content: space-between;
    }
    @media (max-width: 39.375rem) {
      grid-template-columns: unset;
    }
  `,
};

export default AppPage;
