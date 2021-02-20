import React, { Fragment } from "react";
import styled from "@emotion/styled";
import { Header } from "components/Header";
import { Footer } from "components/Footer";
import { Forbidden } from "components/Forbidden";

export const Layout: React.FC<{ isAllowed?: boolean }> = ({
  children,
  isAllowed = true,
}) => {
  return (
    <Fragment>
      <Header />
      <Main>
        {isAllowed !== undefined ? (
          isAllowed === false ? (
            <Forbidden />
          ) : (
            children
          )
        ) : null}
      </Main>
      <Footer />
    </Fragment>
  );
};

const Main = styled.main`
  width: 80%;
  max-width: 1000px;
  height: 100%;
  min-height: calc(100vh - 100px - 80px);
  padding: 50px;
  margin: 50px auto;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #e0e0e0;

  @media screen and (max-width: 600px) {
    padding: 30px 20px;
    margin: 30px auto;
    width: 90%;
    min-height: calc(100vh - 150px - 80px);
  }
`;
