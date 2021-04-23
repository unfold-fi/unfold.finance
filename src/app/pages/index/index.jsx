import * as React from 'react';
import styled from 'styled-components';
import PrimaryButton from '../../components/primaryButton';

const IndexPage = () => (
  <Container>
    <Heading>
      NFT assets collateralized lending and rent protocol on Ethereum
    </Heading>
    <ButtonContainer>
      <button>Learn more</button>
      <button>Enter app</button>
    </ButtonContainer>
  </Container>
);
const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 5rem;
  align-items: center;
  @media (max-width: 48rem) {
    gap: 1.875rem;
  }
`;
const Heading = styled.h1`
  font-size: 3.5rem;
  line-height: 4rem;
  color: #4b58df;
  max-width: 50rem;
  font-weight: 400;
  @media (max-width: 48rem) {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
`;

export default IndexPage;
