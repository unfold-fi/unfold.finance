import React from 'react';
import styled from 'styled-components';

const primaryColor = '#4B58DF';

const StyledButton = styled.button`
  box-sizing: border-box;
  padding: 0.5rem 1.875rem;

  border: unset;
  border-radius: 0.375rem;

  cursor: pointer;
  outline: none;

  font-size: 1rem;
  font-weight: 400;
  line-height: 1.25rem;

  ${(p) =>
    p.sx.type === 'outline' &&
    `
        background-color: transparent;
        border: 1px solid ${primaryColor};
        color: ${primaryColor};
    `}

  ${(p) =>
    p.sx.type === 'solid' &&
    `
        background-color: ${primaryColor};
        color: white;
    `}

    ${(p) =>
    p.sx.small &&
    `
        font-family : inherit;
        font-size   : 0.75rem;
        font-weight : 700;
        line-height : 1rem;
    `}

    ${(p) =>
    !p.enabled &&
    p.sx.type === 'solid' &&
    `
        background-color: gray;
        color: #000;
    `}

    ${(p) =>
    !p.enabled &&
    p.sx.type === 'outline' &&
    `
        border: 1px solid gray;
        color: gray;
    `}
`;

const Button = (props) => {
  const { sx, onClick, disabled, className, children, ...rest } = props;

  return (
    <StyledButton
      sx={sx}
      onClick={onClick}
      className={className}
      enabled={!disabled}
      disabled={disabled}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
