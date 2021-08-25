import React, { useEffect, useState } from "react";
import { RiErrorWarningFill, RiCheckboxCircleFill } from "react-icons/ri";
import styled from "styled-components";
import { StyledText } from "../components/styled-components";
const CheckStepCLT = ({ input_data, specifications }) => {
  const [sucesso_ts, setSucessoTs] = useState(false);
  const [sucesso_tr, setSucessoTr] = useState(false);
  const [sucesso_tp, setSucessoTp] = useState(false);
  const [sucesso_overshoot, setSucessoOvershoot] = useState(false);
  const [sucesso_yss, setSucessoYss] = useState(false);

  const checkSupLimit = (value, maxValue) => {
    let sucesso = false;
    if (value <= maxValue) {
      sucesso = true;
    }
    return sucesso;
  };

  const checkYss = (InfValue, inf_margin, sup_margin) => {
    let sucesso = false;

    if (InfValue >= inf_margin && InfValue <= sup_margin) {
      sucesso = true;
    }

    return sucesso;
  };

  useEffect(() => {
    if (input_data.step_info && specifications) {
      const PeakTime = input_data.step_info.PeakTime;
      const SteadyStateValue = input_data.step_info.SteadyStateValue;
      const Peak = input_data.step_info.Peak;
      const RiseTime = input_data.step_info.RiseTime;
      const SettlingTime = input_data.step_info.SettlingTime;
      const Yss = input_data.yss;

      const maxOvershoot = parseFloat(specifications.overshoot);
      const maxPeakTime = parseFloat(specifications.peakTime);
      const maxRiseTime = parseFloat(specifications.riseTime);
      const maxSettlingTime = parseFloat(specifications.settlingTime);
      const varSteadyState = parseFloat(specifications.varSteadyState);
      const maxPeak = (Yss * maxOvershoot) / 100 + Yss;
      const sup_margin = (1 + varSteadyState / 100) * Yss;
      const inf_margin = (1 - varSteadyState / 100) * Yss;

      setSucessoTs(checkSupLimit(SettlingTime, maxSettlingTime));
      setSucessoTp(checkSupLimit(PeakTime, maxPeakTime));
      setSucessoTr(checkSupLimit(RiseTime, maxRiseTime));
      setSucessoOvershoot(checkSupLimit(Peak, maxPeak));
      setSucessoYss(checkYss(SteadyStateValue, inf_margin, sup_margin));
    }
  }, [input_data, specifications]);
  console.log(
    "Sucessos",
    sucesso_yss,
    sucesso_overshoot,
    sucesso_tp,
    sucesso_tr,
    sucesso_ts
  );

  return (
    <>
      {input_data.step_info && specifications ? (
        <PageWrapper>
          <Wrapper>
            {sucesso_tr ? (
              <RiCheckboxCircleFill color="green" size={20} />
            ) : (
              <RiErrorWarningFill color="red" size={20} />
            )}
            <StyledText>Tempo de subida </StyledText>
          </Wrapper>
          <Wrapper>
            {sucesso_tp ? (
              <RiCheckboxCircleFill color="green" size={20} />
            ) : (
              <RiErrorWarningFill color="red" size={20} />
            )}
            <StyledText>Tempo de pico </StyledText>
          </Wrapper>
          <Wrapper>
            {sucesso_ts ? (
              <RiCheckboxCircleFill color="green" size={20} />
            ) : (
              <RiErrorWarningFill color="red" size={20} />
            )}
            <StyledText>Tempo de acomodação </StyledText>
          </Wrapper>
          <Wrapper>
            {sucesso_overshoot ? (
              <RiCheckboxCircleFill color="green" size={20} />
            ) : (
              <RiErrorWarningFill color="red" size={20} />
            )}
            <StyledText>Overshoot </StyledText>
          </Wrapper>
          <Wrapper>
            {sucesso_yss ? (
              <RiCheckboxCircleFill color="green" size={20} />
            ) : (
              <RiErrorWarningFill color="red" size={20} />
            )}
            <StyledText>Variação em regime permanente </StyledText>
          </Wrapper>
        </PageWrapper>
      ) : (
        <></>
      )}
    </>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
`;

export default CheckStepCLT;
