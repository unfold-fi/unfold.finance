import styled, { keyframes } from 'styled-components';

const AlertOnShow = keyframes`
  from {
    opacity: 0;
    transform: translateY(-6.25rem);
  }
`;

export const Container = styled.div`
  width: 18.75rem;
  @media (max-width: 48rem) {
    width: 100%;
  }
`;

export const Item = styled.div`
  position: relative;
  padding: 0.625rem 1.5625rem;
  background: white;
  border: 1px solid #e5e5df;
  border-radius: 6px;
  margin-bottom: 6px;
  display: flex;
  flex-direction: column;

  animation: ${AlertOnShow} 0.1s ease;
  box-shadow: -1px 1px 2px 0px rgba(80, 80, 80, 0.1);
`;

export const Message = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 0.625rem;
    flex-grow: 1;
  `,
  Text: styled.div`
    font-size: 0.75rem;
  `,
  Link: styled.a`
    font-size: 0.75rem;
    color: #4b58df;
  `,
};

export const Close = styled.div`
  position: absolute;
  top: 3px;
  right: 10px;
  cursor: pointer;
`;

export const IconImage = styled.img``;
