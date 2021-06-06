import React, { useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';

import styled, { keyframes } from 'styled-components';

import LogoImg from '../../assets/Logo.svg';

import { truncateAddress, CONSTANTS } from '../../utils';

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

  const mobileRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const MOBILE_MENU = (
    <MobileWrapper ref={mobileRef}>
      <MobileIcon
        open={mobileOpen}
        onClick={() => setMobileOpen(!mobileOpen)}
      />
      <MobileContainer open={mobileOpen}>
        {account && (
          <Profile.Address>{truncateAddress(account)}</Profile.Address>
        )}
        {!account && (
          <MobileConnectButton
            sx={{ type: 'outline' }}
            onClick={handleConnectButtonClick}
          >
            Connect Wallet
          </MobileConnectButton>
        )}
        <MobileLink
          href="https://docs.unfold.finance"
          alt="Unfold Finance Documentation"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </MobileLink>
        <MobileLinkInternal to="/rewards" title="Unfold Rewards">
          Rewards
        </MobileLinkInternal>
      </MobileContainer>
    </MobileWrapper>
  );

  return (
    <Container>
      <LogoWrapper>
        <Link to="/" title="Unfold Finance">
          <Logo src={LogoImg} />
        </Link>
      </LogoWrapper>
      <NavigationWrapper>
        <NavigationLink
          href="https://docs.unfold.finance"
          alt="Unfold Finance Documentation"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </NavigationLink>
        <NavigationLinkInternal to="/rewards" title="Unfold Rewards">
          Rewards
        </NavigationLinkInternal>
      </NavigationWrapper>
      {!account && (
        <ConnectButtonWrapper>
          <ConnectButton
            sx={{ type: 'outline', small: 'true' }}
            onClick={handleConnectButtonClick}
          >
            Connect Wallet
          </ConnectButton>
        </ConnectButtonWrapper>
      )}
      {account && (
        <Profile.Wrapper>
          <Profile.Address>{truncateAddress(account)}</Profile.Address>
        </Profile.Wrapper>
      )}
      {MOBILE_MENU}
    </Container>
  );
};

const Container = styled.header`
  position: relative;
  display: grid;
  grid-template-columns: max-content 1fr repeat(2, max-content);
  padding: 0.75rem 0;
  @media (max-width: 48rem) {
    grid-template-columns: unset;
    grid-auto-flow: column;
  }
`;

const LogoWrapper = styled.div`
  margin-top: -0.125rem;
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
  gap: 2.5rem;
  margin-left: 2.5rem;

  @media (max-width: 48rem) {
    display: none;
  }
`;

const NavigationLink = styled.a`
  display: block;
  padding: 10px 5px;
`;

const NavigationLinkInternal = styled(Link)`
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
    display: flex;
    align-items: center;
    @media (max-width: 48rem) {
      display: none;
    }
  `,

  Address: styled.div`
    padding: 0.6875rem 1rem;
    border: 1px solid ${CONSTANTS.primaryColor};
    border-radius: 0.375rem;
    color: ${CONSTANTS.primaryColor};
    font-size: 0.875rem;
    cursor: pointer;
  `,
};

const MobileWrapper = styled.div`
  display: grid;
  align-content: center;
  margin: 0 0.625rem;
  min-width: 1.5625rem;
  justify-content: end;

  @media (min-width: 48rem) {
    display: none;
  }
`;

const MobileIcon = styled.div`
  &:before {
    content: '${(p) => (!p.open ? '☰' : '⨯')}';
  }

  font-size: ${(p) => (!p.open ? '1.875rem' : '2.125rem')};
  font-weight: 700;

  cursor: pointer;
`;

const MobileContainerOnShown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-6.25rem);
  }
`;

const MobileContainer = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  top: 3.125rem;

  display: ${(p) => (p.open ? 'flex' : 'none')};
  flex-direction: column;

  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 3.125rem);
  padding: 1.25rem;
  background-color: white;
  align-items: center;

  animation: ${MobileContainerOnShown} 0.1s ease;
`;

const MobileConnectButton = styled(PrimaryButton)`
  margin-bottom: 0.625rem;
`;
const MobileLink = styled.a`
  margin: 0.625rem 0;
`;
const MobileLinkInternal = styled(Link)`
  margin: 0.625rem 0;
`;

export default HeaderComponent;
