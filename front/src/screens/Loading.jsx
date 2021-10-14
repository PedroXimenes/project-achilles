import { Loading } from "../components/styled-components";
import React from "react";
import styled from "styled-components";

export const LoadingPage = () => {
  return (
    <Wrapper>
      <Loading />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  width: 100%;
  height: 100%;
  z-index: 2000;
`;
