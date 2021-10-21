import Head from "next/head";
import React, { useMemo } from "react";

type Props = {
  title?: string;
};

export const MetaHead: React.FC<Props> = ({ title }) => {
  const pageTitle = useMemo(
    () => (title ? `${title} | CodeView` : "CodeView"),
    []
  );

  return (
    <Head>
      <title>{pageTitle}</title>
    </Head>
  );
};
