import React, { Fragment } from "react";
import styled from "@emotion/styled";
import { Header } from "components/Header";

export const Layout: React.FC = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <Main>{children}</Main>
    </Fragment>
  );
};

const Main = styled.main`
  width: 80%;
  padding: 50px 0;
  margin: 0 auto;
`;
