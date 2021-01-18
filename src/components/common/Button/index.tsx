import styled from "@emotion/styled";
import React from "react";

type Props = {
  invert?: boolean;
  onClick: () => void;
};

export const Button: React.FC<Props> = ({ children, invert, onClick }) => {
  return (
    <StyledButton invert={invert} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ invert?: boolean }>`
  display: inline-block;
  text-align: center;
  background: ${({ invert }) => (invert ? "transparent" : "#4568fb")};
  color: ${({ invert }) => (invert ? "#4568fb" : "#fff")};
  border-radius: 4px;
  width: auto;
  min-width: 120px;
  padding: 10px 15px;
  font-size: 18px;
  border: ${({ invert }) => (invert ? "1px solid #4568fb" : "none")};
  cursor: pointer;
  transition: background 0.2s color 0.2s;

  &:hover {
    background: ${({ invert }) =>
      invert ? "#4568fb" : "rgba(69, 105, 251, 0.9)"};
    color: #fff;
  }
`;
