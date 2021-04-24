import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PrimaryButton from '../../components/primaryButton';

const NotFoundPage = () => (
  <Container>
    <Heading>404: Page not found</Heading>
    <ButtonContainer>
      <Link to="/">
        <PrimaryButton sx={{ type: 'outline' }}>Back to main</PrimaryButton>
      </Link>
    </ButtonContainer>
  </Container>
);
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  justify-content: center;
  @media (max-width: 48rem) {
    gap: 0.625rem;
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
  gap: 1.5rem;
`;

export default NotFoundPage;
