import * as React from 'react';
import styled from 'styled-components';

const NotFoundPage = () => (
  <Container>
    <div className="container pt-16 md:pt-32 m-auto flex flex-wrap flex-col md:flex-row items-center">
      Not found
    </div>
  </Container>
);
const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 5rem;
  @media (max-width: 48rem) {
    gap: 1.875rem;
  }
`;

export default NotFoundPage;
