import React, { Fragment } from "react";
import styled from "@emotion/styled";
import { Header } from "components/Header";
import { Footer } from "components/Footer";

export const Layout: React.FC = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Fragment>
  );
};

const Main = styled.main`
  width: 80%;
  height: 100%;
  min-height: calc(100vh - 200px - 80px);
  padding: 50px;
  margin: 50px auto;
  background: #fff;
  border-radius: 4px;
  border: 1px solid rgba(50, 50, 50, 0.1);

  @media screen and (max-width: 600px) {
    padding: 30px 20px;
    margin: 30px auto;
    width: 90%;
    min-height: calc(100vh - 150px - 80px);
  }
`;
