// Library
import styled from "styled-components";

/*-----------------------------------------------------------------------------------*/

export const Footer = () => {
  return <FooterContainer>© {new Date().getFullYear()} Kuldip Raj</FooterContainer>;
};

const FooterContainer = styled.footer`
  width: 100%;
  padding: 1rem 2rem;
  background-color: ${({ theme: { colors } }) => colors.footerBackground};
  color: #555;
  text-align: center;
  font-size: 0.9rem;
  position: fixed;
  bottom: 0;
  left: 0;
`;
