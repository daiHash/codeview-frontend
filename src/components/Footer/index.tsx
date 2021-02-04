import styled from "@emotion/styled";
import { useMemo } from "react";

export const Footer = () => {
  const startYear = 2021;

  const currentYear = useMemo(() => {
    const _currentYear = new Date().getFullYear();
    return startYear === _currentYear ? "" : ` ~ ${_currentYear}`;
  }, []);
  return (
    <StyledFooter>
      <p>
        All rights reserved. Code Snippet Memo &copy; {startYear}
        {currentYear}
      </p>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  background: #1f1f1f;
  color: #fff;
`;
