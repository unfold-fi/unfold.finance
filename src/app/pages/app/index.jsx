import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import PoolCard from '../../components/pool';

const AppPage = () => (
  <Container>
    <Heading>Stake</Heading>
    <Pool.Grid>
      <PoolCard />
      <PoolCard />
      <PoolCard />
      <PoolCard />
      <PoolCard />
      <PoolCard />
      <PoolCard />
    </Pool.Grid>
  </Container>
);
const Container = styled.div`
  width: 100%;
`;
const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
  @media (max-width: 48rem) {
    font-size: 1.125rem;
  }
`;

const Pool = {
  Grid: styled.div`
    display: grid;
    grid-template-columns: repeat(3, auto);
    row-gap: 3.125rem;
    margin-top: 1.875rem;
    justify-content: space-between;
    @media (max-width: 59.625rem) {
      grid-template-columns: repeat(2, auto);
      justify-content: space-evenly;
    }
    @media (max-width: 39.375rem) {
      grid-template-columns: unset;
    }
  `,
};

export default AppPage;
