import React from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import { Theme } from "../../config";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
export const Loading = () => {
  return (
    <LoadingWrapper className="load">
      <Loader type="TailSpin" color={Theme.pink} height={100} width={100} />
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 500px;
`;
