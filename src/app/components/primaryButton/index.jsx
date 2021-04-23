import React from 'react';
import styled from 'styled-components';

const primaryColor = '#4B58DF';

const StyledButton = styled.button`
  box-sizing: border-box;
  padding: 8px 16px;

  border: unset;
  border-radius: 0.375rem;

  cursor: pointer;
  outline: none;

  font-size: 1rem;
  font-weight: 400;
  line-height: 1.25rem;

  min-width: 140px;

  ${(props) =>
    props.sx.type === 'outline' &&
    `
        background-color: transparent;
        border: 1px solid ${primaryColor};
        color: ${primaryColor};
    `}

  ${(props) =>
    props.sx.type === 'solid' &&
    `
        background-color: ${primaryColor};
        color: white;
    `}

    ${(props) =>
    props.sx.small &&
    `
        font-family : inherit;
        font-size   : 0.75rem;
        font-weight : 700;
        line-height : 1rem;
    `}

    ${(props) =>
    !props.enabled &&
    props.sx.type === 'solid' &&
    `
        background-color: gray;
        color: #000;
    `}

    ${(props) =>
    !props.enabled &&
    props.sx.type === 'outline' &&
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
