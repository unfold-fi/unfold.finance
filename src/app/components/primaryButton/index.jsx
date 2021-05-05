import React from 'react';
import styled from 'styled-components';

import { CONSTANTS } from '../../utils';

const StyledButton = styled.button`
  box-sizing: border-box;
  padding: 0.6875rem 1rem;

  border: unset;
  border-radius: 0.375rem;

  ${(p) =>
    p.enabled &&
    `
    cursor: pointer;
    `}
  outline: none;

  font-size: 1rem;
  font-weight: 400;
  line-height: 1.25rem;

  min-width: 8.75rem;

  ${(props) =>
    props.sx.type === 'outline' &&
    props.enabled &&
    `
        background-color: transparent;
        border: 1px solid ${CONSTANTS.primaryColor};
        color: ${CONSTANTS.primaryColor};
        &&:hover {
          border: 1px solid ${CONSTANTS.primaryColorHover};
          color: ${CONSTANTS.primaryColorHover};
        }
    `}

  ${(props) =>
    props.sx.type === 'solid' &&
    props.enabled &&
    `
        background-color: ${CONSTANTS.primaryColor};
        border: 1px solid ${CONSTANTS.primaryColor};
        color: white;
        &&:hover {
          border: 1px solid ${CONSTANTS.primaryColorHover};
          background-color: ${CONSTANTS.primaryColorHover};
        }        
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
        background-color: #BEC3F3;
        border: 1px solid #BEC3F3;
        color: white;
    `}

    ${(props) =>
    !props.enabled &&
    props.sx.type === 'outline' &&
    `
        border: 1px solid #BEC3F3;
        background-color: white;
        color: #BEC3F3;
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
