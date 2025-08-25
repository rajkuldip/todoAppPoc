// Library
import styled from "styled-components";

/*-----------------------------------------------------------------------------------*/

const HeaderContainer = styled.header`
  width: 100%;
  padding: 1rem 2rem;
  background-color: #4a90e2;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Header = () => {
  return <HeaderContainer>POC</HeaderContainer>;
};

