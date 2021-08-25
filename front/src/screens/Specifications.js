import React from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import { RiCloseCircleLine } from "react-icons/ri";
import { useHistory } from "react-router";

import StepCLTemplate from "../components/StepCLTemplate";
import CheckStepCLT from "../components/CheckStepCLT";
import { useDataContext } from "../components/DataContext";
import { Theme } from "../config";

export const Specifications = () => {
  const { dataAnalysis, input } = useDataContext();
  const history = useHistory();

  console.log("chegou em sp: ", dataAnalysis);

  return (
    <PageWrapper>
      <Wrapper>
        <StyledClose onClick={() => history.push("/analysis")} />
        <StepCLTemplate
          input_data={dataAnalysis}
          specifications={input}
          className="test"
        />
      </Wrapper>
      <CheckStepCLT input_data={dataAnalysis} specifications={input} />
    </PageWrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  margin: 4% 1%;
  background-color: #f5f5f5;
  border-radius: 10px;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
`;

const StyledClose = styled(RiCloseCircleLine)`
  color: ${Theme.darkBlue};
  size: 50px;
  margin: 1% 0 0 97%;
  cursor: pointer;
`;
