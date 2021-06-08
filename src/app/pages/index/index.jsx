import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PrimaryButton from '../../components/primaryButton';
import LinkButton from '../../components/linkButton';

const IndexPage = () => (
  <Container>
    <Heading>
      NFT assets collateralized
      <br />
      lending and rent protocol
      <br />
      on the Ethereum
    </Heading>
    <ButtonContainer>
      <LinkButton
        sx={{ type: 'outline' }}
        href="https://docs.unfold.finance"
        alt="Unfold Finance Documentation"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn more
      </LinkButton>
      <Link to="/rewards">
        <PrimaryButton sx={{ type: 'solid' }}>Enter App</PrimaryButton>
      </Link>
    </ButtonContainer>
  </Container>
);
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  @media (max-width: 31.25rem) {
    font-size: 1.6875rem;
    line-height: 2rem;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  margin-top: 1.25rem;
  margin-left: -1.5rem;
  @media (max-width: 48rem) {
    margin-top: 0.625rem;
  }
  && a {
    margin-left: 1.5rem;
  }
`;

export default IndexPage;
