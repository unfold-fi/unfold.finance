import React, { useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';

import styled, { keyframes } from 'styled-components';

import LogoImg from '../../assets/logo.png';

import injectedConnector from '../../web3/connectors/injected';
import { useEagerConnect, useInactiveListener } from '../../web3';
import PrimaryButton from '../primaryButton';

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const { account, activate, deactivate } = useWeb3React();

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager);

  const handleConnectButtonClick = async () => {
    if (account) {
      deactivate();
    } else {
      await activate(injectedConnector);
    }
  };
  return (
    <Container>
      <LogoWrapper>
        <Link to="/" title="Unfold Finance">
          <Logo src={LogoImg} />
        </Link>
      </LogoWrapper>
      <NavigationWrapper>
        <NavigationLink href="/docs">Documentation</NavigationLink>
        <NavigationLink href="/docs">Governance</NavigationLink>
        <NavigationLink href="/docs">Forum</NavigationLink>
        <NavigationLink href="/docs">Rewards</NavigationLink>
      </NavigationWrapper>
      {!account && (
        <ConnectButtonWrapper>
          <ConnectButton
            sx={{ type: 'outline' }}
            onClick={handleConnectButtonClick}
          >
            Connect Wallet
          </ConnectButton>
        </ConnectButtonWrapper>
      )}
      {account && (
        <Profile.Wrapper>
          <Profile.Container>
            <Profile.Nick>{account}</Profile.Nick>
            <Profile.Address>{account}</Profile.Address>
          </Profile.Container>
        </Profile.Wrapper>
      )}
    </Container>
  );
};

const Container = styled.header`
  position: relative;
  display: grid;
  grid-template-columns: max-content 1fr repeat(4, max-content);
  padding: 1.25rem 0;
  @media (max-width: 48rem) {
    grid-template-columns: unset;
    grid-auto-flow: column;
  }
`;

const LogoWrapper = styled.div`
  margin-top: -0.1875rem;
`;

const Logo = styled.img`
  width: 4.0625rem;
  height: 1.875rem;

  @media (max-width: 48rem) {
    width: 4.0625rem;
    height: 1.875rem;
  }
`;

const NavigationWrapper = styled.nav`
  display: flex;
  gap: 3.75rem;
  margin-left: 3.125rem;

  @media (max-width: 48rem) {
    display: none;
  }
`;

const NavigationLink = styled.a`
  display: block;
  padding: 10px 5px;
`;

const ConnectButtonWrapper = styled.div`
  display: grid;
  justify-content: end;
  align-content: center;
  @media (max-width: 48rem) {
    display: none;
  }
`;
const ConnectButton = styled(PrimaryButton)``;

const Profile = {
  Wrapper: styled.div`
    display: grid;
    justify-content: start;
    align-content: center;

    @media (max-width: 62.5rem) {
      display: none;
    }
  `,
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr 2.5rem;
    grid-template-rows: 1.25rem 0.9375rem;
    column-gap: 0.625rem;
    row-gap: 0.3125rem;

    user-select: none;
    cursor: pointer;
  `,

  Nick: styled.div`
    grid-column-start: 1;
    grid-row-start: 1;

    font-weight: 700;
    text-align: right;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,

  Address: styled.div`
    grid-column-start: 1;
    grid-row-start: 2;
    font-size: 0.625rem;
    text-align: right;
  `,
};

export default HeaderComponent;
