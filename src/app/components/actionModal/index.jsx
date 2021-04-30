import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import styled, { keyframes } from 'styled-components';

import PrimaryButton from '../primaryButton';
import { toFixed } from '../../utils';
import { ModalType, closeModal } from '../../store/slices/modal';
import { useClickOutside } from '../../hooks';
import {
  depositTokenRequest,
  withdrawTokenRequest,
  exitTokenRequest,
  getRewardRequest,
} from '../../store/slices/web3';

const ModalView = ({ className }) => {
  const {
    open,
    type,
    title,
    vault,
    balance,
    action1Text,
    action2Text,
  } = useSelector((state) => state.modal);

  const { library } = useWeb3React();

  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const withdrawModal = type === ModalType.WITHDRAW;
  const claimModal = type === ModalType.CLAIM;

  const [amount, setAmount] = useState('0.0');

  useEffect(() => {
    if (claimModal) {
      setAmount(balance);
    }
  }, [claimModal, balance]);

  const handleModalClose = () => {
    setAmount('0.0');
    dispatch(closeModal());
  };
  useClickOutside(modalRef, () => {
    handleModalClose();
  });

  const handleBalanceClick = () => {
    setAmount(balance);
  };

  const handleAction1Click = () => {
    if (withdrawModal) {
      dispatch(withdrawTokenRequest({ vault, amount, library }));
    } else if (claimModal) {
      dispatch(getRewardRequest({ vault, library }));
    } else {
      dispatch(depositTokenRequest({ vault, amount, library }));
    }
  };

  const handleAction2Click = () => {
    dispatch(exitTokenRequest({ vault, library }));
  };
  return (
    <Backdrop className={className} show={open}>
      <Modal.Container ref={modalRef}>
        <Modal.HeaderContainer>
          <Modal.Title>{title}</Modal.Title>
          <Modal.Close onClick={handleModalClose}>&#10005;</Modal.Close>
        </Modal.HeaderContainer>
        <Modal.ContentContainer>
          <Modal.Balance onClick={handleBalanceClick}>
            Balance: {toFixed(balance, 4)}
          </Modal.Balance>

          <Modal.Input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            readOnly={claimModal}
          />
        </Modal.ContentContainer>
        {!claimModal && (
          <Modal.Note>
            1% deposit fee used for the future liquidity. Based on your deposit
            time there will be withdrawal fee not less then 1% for the same
            purpose.
          </Modal.Note>
        )}
        <Modal.Action>
          <PrimaryButton
            enabled={Number(amount) > 0}
            sx={{ type: 'outline' }}
            onClick={handleAction1Click}
          >
            {action1Text}
          </PrimaryButton>
          {withdrawModal && (
            <PrimaryButton
              enabled={Number(amount) > 0}
              sx={{ type: 'outline' }}
              onClick={handleAction2Click}
            >
              {action2Text}
            </PrimaryButton>
          )}
        </Modal.Action>
      </Modal.Container>
    </Backdrop>
  );
};

const Shown = keyframes`
  from { 
    opacity: 0;
  }
`;

const Backdrop = styled.div`
  ${(prop) => (prop.show ? `display: flex;` : `display: none;`)}
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  justify-content: center;
  align-items: center;
  animation: ${Shown} 0.2s ease;
`;
const Modal = {
  Container: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;

    width: 18.75rem;
    height: 23.4375rem;
    border: 1px solid #e5e5df;
    border-radius: 0.375rem;
    background-color: white;

    padding: 1.5625rem;
    justify-content: space-between;
  `,
  HeaderContainer: styled.div``,

  Title: styled.div`
    font-size: 1.125rem;
    font-weight: 500;
  `,
  Close: styled.div`
    position: absolute;
    right: 0.625rem;
    top: 0.625rem;
    font-size: 1rem;
    cursor: pointer;
  `,
  ContentContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex-grow: 1;
    justify-content: center;
    margin-bottom: 1.875rem;
  `,
  Balance: styled.div`
    font-size: 0.875rem;
    color: #8c8ea0;
    text-align: right;
    cursor: pointer;
  `,
  Input: styled.input`
    background: #f1f1ee;
    border-radius: 6px;
    font-size: 18px;
    font-weight: 700;
    padding: 10px;
    border: 1px solid #f1f1ee;
    text-align: center;
    &&:focus {
      outline: none;
      border: 1px solid #e5e5e2;
      border-radius: 6px;
      box-shadow: none;
    }
  `,

  Note: styled.p`
    font-size: 0.875rem;
    margin-bottom: 1.875rem;
  `,

  Action: styled.div`
    display: flex;
    gap: 10px;
    && button {
      width: 100%;
    }
  `,
};

export default ModalView;
