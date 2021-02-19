import React from "react";
import { UnderlinedText } from "./UnderLinedText";

export const Heading2: React.FC = ({ children }) => {
  return (
    <h2>
      <UnderlinedText underlineColor={{ plain: "#F9D63E" }}>
        {children}
      </UnderlinedText>
    </h2>
  );
};
