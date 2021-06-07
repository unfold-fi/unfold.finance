import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';

import { Normalize } from 'styled-normalize';
import styled, { createGlobalStyle } from 'styled-components';

import { useEagerConnect, useInactiveListener } from './app/web3';
import { getAccountDataRequest } from './app/store/slices/web3';

import Alerts from './app/components/alert';

import routes from './app/routes';
import NotFound from './app/pages/404';
import Header from './app/components/header';
import Footer from './app/components/footer';
import ActionModal from './app/components/actionModal';
import ConnectModal from './app/components/connectModal';

const App = () => {
  const dispatch = useDispatch();

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager);

  const { account, library } = useWeb3React();

  useEffect(() => {
    if (!!account && !!library) {
      dispatch(getAccountDataRequest({ account, library }));
    }
  }, [dispatch, account, library]);

  return (
    <>
      <Normalize />
      <GlobalStyle />
      <ActionModalContainer />
      <ConnectModalContainer />
      <Wrapper>
        <Container>
          <AlertContainer>
            <Alerts />
          </AlertContainer>
          <Header />
          <Content>
            <Switch>
              {routes.map((route, index) => (
                <Route key={index} {...route} />
              ))}
              <Route component={NotFound} />
            </Switch>
          </Content>
          <Footer />
        </Container>
      </Wrapper>
    </>
  );
};
const GlobalStyle = createGlobalStyle`
    * {
        font-family: "Inter", sans-serif;
        font-display: swap;
        font-size: 100%;
        color: #0E1239;
    }

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {

    }
    body {
      margin: 0;
      font-size: 100%;
      line-height: 120%;
      background-color: white;
    }
    ol, ul {
      list-style: none;
    }
    blockquote, q {
      quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
      content: '';
      content: none;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }
    a {
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }

    @media (max-width: 48rem) {
      body {
        font-size: 0.875rem;
      }
    }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  max-width: 1072px;
  min-width: 375px;
  margin: 0 auto;
`;

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  margin: 0 1.5rem;

  @media (max-width: 48rem) {
    margin: 0 1.5rem;
  }
`;

const Content = styled.main`
  display: flex;
`;

const AlertContainer = styled.div`
  position: absolute;
  top: 4rem;
  right: 0;
  @media (max-width: 48rem) {
    width: 100%;
  }
  z-index: 20;
`;

const ActionModalContainer = styled(ActionModal)``;
const ConnectModalContainer = styled(ConnectModal)``;

export default App;
