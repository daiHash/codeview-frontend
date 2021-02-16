import React, { Fragment } from "react";
import { LoadingIcon } from ".";

export const LoadingContent: React.FC<{
  isLoading: boolean;
  marginTop?: string;
}> = ({ children, isLoading, marginTop }) => {
  return (
    <Fragment>
      {isLoading ? <LoadingIcon marginTop={marginTop} /> : children}
    </Fragment>
  );
};
