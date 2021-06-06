import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterComponent = () => (
  <Footer.Container>
    <Footer.SocRow>
      <SocialLink
        href="https://twitter.com/UnfoldFinance"
        title="Unfold Finance Twitter"
        target="_blank"
        rel="noopener noreferrer"
      >
        Twitter
      </SocialLink>
      <SocialLink
        href="https://t.me/unfoldfinance"
        title="Unfold Finance Telegram"
        target="_blank"
        rel="noopener noreferrer"
      >
        Telegram
      </SocialLink>
    </Footer.SocRow>
  </Footer.Container>
);

const Footer = {
  Container: styled.footer`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    box-sizing: border-box;
    margin-top: 1.875rem;
    padding: 1.25rem 0 1.25rem 0;
    opacity: 0.8;

    @media (max-width: 48rem) {
      padding: 0.625rem 0 0.625rem 0;
      margin-top: 1.875rem;
    }
  `,

  SocRow: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-top: 0.625rem;
  `,

  Copy: styled.div`
    margin-left: auto;
  `,

  DocsRow: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-top: 1.875rem;

    @media (max-width: 48rem) {
      margin-top: 0.625rem;
    }
  `,

  TermsOfService: styled.div``,
};
const LinkWrapper = styled(Link)`
  && {
    line-height: 150%;
    font-size: 0.75rem;
    color: #808080;

    @media (max-width: 48rem) {
      font-size: 0.5rem;
    }
  }
`;

const SocialLink = styled.a`
  && {
    margin-right: 1.25rem;
    @media (max-width: 48rem) {
      margin-right: 0.75rem;
    }
  }
`;

export default FooterComponent;
