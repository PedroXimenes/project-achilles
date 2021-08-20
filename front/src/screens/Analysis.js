import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BodeDiagram from "../components/BodeDiagram";
import RootLocus from "../components/RootLocus";
import StepResponse from "../components/StepResponse";
import ShowInput from "../components/ShowInput";
import { MenuBar, Step } from "../components/styled-components";
import "../App.css";
import api from "../services/api";

import { useDataContext } from "../components/DataContext";

export const Analysis = () => {
  const { dataAnalysis, input } = useDataContext();

  const loadAnalysis = async () => {
    try {
      const response = await api.get("/analysis");
      console.log("Response: ", response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadAnalysis();
  }, []);

  return (
    <>
      <MenuBar hasLogo />
      <Wrapper>
        <ShowInput input_data={input} />
        <Step input_data={dataAnalysis} />
      </Wrapper>
      <Wrapper className="mf">
        <ColumnWrapper>
          <StepResponse input_data={dataAnalysis} className="test" />
          <RootLocus input_data={dataAnalysis} className="test" />
        </ColumnWrapper>
        <BodeDiagram input_data={dataAnalysis} className="test" />
      </Wrapper>
    </>
  );
};

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
