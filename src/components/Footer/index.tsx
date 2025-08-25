// Library
import styled from "styled-components";

/*-----------------------------------------------------------------------------------*/

const FooterContainer = styled.footer`
  width: 100%;
  padding: 1rem 2rem;
  background-color: #f1f1f1;
  color: #555;
  text-align: center;
  font-size: 0.9rem;
  position: fixed;
  bottom: 0;
  left: 0;
`;

export const Footer = () => {
  return <FooterContainer>© {new Date().getFullYear()} Kuldip Raj</FooterContainer>;
};


