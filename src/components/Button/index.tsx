import styled from "@emotion/styled";
import React from "react";

type Props = {
  invert?: boolean;
  disabled?: boolean;
  onClick: () => void;
  styles?: {
    padding?: string;
    width?: string;
    fontSize?: string;
  };
};

export const Button: React.FC<Props> = ({
  children,
  invert,
  onClick,
  styles,
  disabled,
}) => {
  return (
    <StyledButton
      invert={invert}
      onClick={onClick}
      padding={styles?.padding ?? "10px 15px"}
      width={styles?.width ?? "120px"}
      fontSize={styles?.fontSize ?? "18px"}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  invert?: boolean;
  padding: string;
  width: string;
  fontSize: string;
}>`
  display: inline-block;
  text-align: center;
  background: ${({ invert }) => (invert ? "transparent" : "#3E60F9")};
  color: ${({ invert }) => (invert ? "#3E60F9" : "#fff")};
  border-radius: 4px;
  width: auto;
  min-width: ${({ width }) => width};
  padding: ${({ padding }) => padding};
  font-size: ${({ fontSize }) => fontSize};
  border: ${({ invert }) => (invert ? "1px solid #3E60F9" : "none")};
  cursor: pointer;
  transition: background 0.2s color 0.2s;
  &[disabled] {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:hover {
    background: ${({ invert }) =>
      invert ? "#3E60F9" : "rgba(69, 105, 251, 0.9)"};
    color: #fff;
  }
`;
