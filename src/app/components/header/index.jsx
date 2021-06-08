import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import styled, { keyframes } from 'styled-components';

import LogoImg from '../../assets/Logo.svg';

import ConnectButton from '../connectButton';
import IconClose from '../../assets/icons/icon-close-mobile.svg';
import IconBurger from '../../assets/icons/icon-burger.svg';

const HeaderComponent = () => {
  const mobileRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const MOBILE_MENU = (
    <MobileWrapper ref={mobileRef}>
      <MobileIcon
        src={mobileOpen ? IconClose : IconBurger}
        onClick={() => setMobileOpen(!mobileOpen)}
      />
      <MobileContainer open={mobileOpen}>
        <ConnectButton />
        <MobileLink
          href="https://docs.unfold.finance"
          alt="Unfold Finance Documentation"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </MobileLink>
        <MobileLinkInternal
          to="/rewards"
          onClick={() => {
            setMobileOpen(false);
          }}
          title="Unfold Rewards"
        >
          Rewards
        </MobileLinkInternal>
      </MobileContainer>
    </MobileWrapper>
  );

  return (
    <Container>
      <LogoWrapper>
        <Link
          to="/"
          title="Unfold Finance"
          onClick={() => {
            setMobileOpen(false);
          }}
        >
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
      <ConnectButtonWrapper>
        <ConnectButton />
      </ConnectButtonWrapper>

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
  margin-top: -2px;
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
  @media (max-width: 48rem) {
    display: none;
  }
`;

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

const MobileIcon = styled.img`
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

const MobileLink = styled.a`
  margin: 0.625rem 0;
`;
const MobileLinkInternal = styled(Link)`
  margin: 0.625rem 0;
`;

export default HeaderComponent;
