// Library
import styled from "styled-components";

/*-----------------------------------------------------------------------------------*/

export const Header = () => {
  return <HeaderContainer>POC</HeaderContainer>;
};

const HeaderContainer = styled.header`
  width: 100%;
  padding: 1rem 2rem;
  background-color: ${({ theme: { colors } }) => colors.headerBackground};
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

