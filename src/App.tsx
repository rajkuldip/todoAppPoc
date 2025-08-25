// Library
import styled from "styled-components";
import { Fragment } from "react";

// Components
import { List, Header, Footer } from './components'

/*-----------------------------------------------------------------------------------*/

export const App = () => (
  <Fragment>
    <Header />
    <AppContainer>
      <TopContainer>
        <Title>Todo Application</Title>
        <StyledText>
          This POC uses a TypeScript-based Vite structure with Styled-components, React Query, and React Hook Form integrated. Tests are written using React Testing Library.
        </StyledText>
      </TopContainer>
      <Content>
        <List />
      </Content>
    </AppContainer>
    <Footer />
  </Fragment>
);

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-width: 100vw;
  padding: 50px;
  box-sizing: border-box;
  margin: 0 auto;
`;

const TopContainer = styled.div``;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  width: 100%;
  max-width: ${({ theme: { width } }) => width.content};
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 20px;
`;

const StyledText = styled.p`
  font-size: 1.1em;
  line-height: 1.5;
  text-align: center;
  max-width: ${({ theme: { width } }) => width.subHeading};
  margin-bottom: 30px;
`;