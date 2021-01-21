import React from "react";
import styled from "@emotion/styled";
import { Header } from "components/Header";

export const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};

const Container = styled.div``;
