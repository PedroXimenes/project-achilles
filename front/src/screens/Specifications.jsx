import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

import StepCLTemplate from "../components/StepCLTemplate";
import CheckStepCLT from "../components/CheckStepCLT";
import { useDataContext } from "../components/DataContext";

import { MenuBar } from "../components/styled-components";
import { StyledButton } from "../components/ShowInput";

export const Specifications = () => {
  const { dataAnalysis, input } = useDataContext();
  const history = useHistory();

  console.log("chegou em sp: ", dataAnalysis);

  return (
    <>
      <MenuBar hasLogo />

      <PageWrapper>
        <Wrapper>
          <StepCLTemplate
            input_data={dataAnalysis}
            specifications={input}
            className="test"
          />
        </Wrapper>
        <ColW>
          <CheckStepCLT input_data={dataAnalysis} specifications={input} />
          <StButton
            onClick={() => {
              history.push("/analysis");
            }}
            data-cy="analysisB"
          >
            Voltar para análise
          </StButton>
          <StButton2
            onClick={() => {
              history.push("/inputs");
            }}
            data-cy="cInput"
          >
            Alterar entradas
          </StButton2>
        </ColW>
      </PageWrapper>
    </>
  );
};

const StButton = styled(StyledButton)`
  margin: 0 17% 0 0;
`;
const StButton2 = styled(StyledButton)`
  margin: 0 0 0 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  margin: 8% 1%;
  background-color: #f5f5f5;
  border-radius: 10px;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ColW = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;
