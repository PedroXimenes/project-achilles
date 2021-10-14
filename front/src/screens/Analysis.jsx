import React, { useEffect } from "react";
import styled from "styled-components";
import BodeDiagram from "../components/BodeDiagram";
import RootLocus from "../components/RootLocus";
import StepResponse from "../components/StepResponse";
import ShowInput from "../components/ShowInput";
import { Step } from "../components/StepResponseOL";
import { MenuBar } from "../components/styled-components";

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
        <ShowInput input_data={input} scroll />
        <PlotWrapper>
          <Step input_data={dataAnalysis} />
          <ClWrapper className="mf">
            <ColumnWrapper>
              <StepResponse input_data={dataAnalysis} className="test" />
              <RootLocus input_data={dataAnalysis} className="test" />
            </ColumnWrapper>
            <BodeDiagram input_data={dataAnalysis} className="test" />
          </ClWrapper>
        </PlotWrapper>
      </Wrapper>
    </>
  );
};

const PlotWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 52rem;
  width: 75%;
  margin-left: 5%;
  scroll-behavior: smooth;
  overflow-y: scroll;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 136px 0;
`;

const ClWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-top: 8rem;
`;
