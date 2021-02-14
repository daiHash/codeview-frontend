import Image from "next/image";
import styled from "@emotion/styled";

export const EmptyContent = () => (
  <Empty>
    <Image src="/empty.svg" alt="" width={100} height={100} aria-hidden />

    <h3>Oops! there are no snippets yet</h3>
  </Empty>
);

const Empty = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;

  h3 {
    margin-top: 10px;
  }

  @media screen and (max-width: 600px) {
    margin-top: 10%;
  }
`;
