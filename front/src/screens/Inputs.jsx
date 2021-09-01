import React, { useState, useEffect } from "react";
import { Row, Col, Grid } from "react-flexbox-grid";
import styled from "styled-components";
import { ReactComponent as blockDiagram } from "../imgs-ac/blockDiagram.svg";
import { LoadingPage } from "./";
import { useDataContext } from "../components/DataContext";
import api from "../services/api";
import { BsQuestionCircle, BsInfoCircle } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";

import {
  Button,
  Input,
  SubTitle,
  InputTitle,
  HelpText,
} from "../components/styled-components";
import { useHistory } from "react-router-dom";
import { Theme } from "../config";

export const Inputs = () => {
  const history = useHistory();
  const [hnum, setHnum] = useState("");
  const [hden, setHden] = useState("");
  const [gnum, setGnum] = useState("");
  const [gden, setGden] = useState("");
  const [overshoot, setOvershoot] = useState("");
  const [settlingTime, setSettlingTime] = useState("");
  const [riseTime, setRiseTime] = useState("");
  const [peakTime, setPeakTime] = useState("");
  const [varSteadyState, setVarSteadyState] = useState("");
  const [load, setLoad] = useState(false);
  const [sendInfo, setSendInfo] = useState("");

  const { input, setInput } = useDataContext();
  const [showChartAnalysis, setShowChartAnalysis] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const { setDataAnalysis } = useDataContext();

  useEffect(() => {
    setHnum(input.hnum || "");
    setHden(input.hden || "");
    setGnum(input.gnum || "");
    setGden(input.gden || "");
    setOvershoot(input.overshoot || "");
    setVarSteadyState(input.varSteadyState || "");
    setSettlingTime(input.settlingTime || "");
    setRiseTime(input.riseTime || "");
    setPeakTime(input.peakTime || "");

    console.log("inputs", input);
    console.log("len", input.lenght);
  }, [input]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (hnum.length >= hden.length) {
      alert(
        "O denominador do processo tem que ter maior grau do que o numerador"
      );
      return;
    }

    setSendInfo({ hnum, hden, gnum, gden, load });

    setInput({
      hnum,
      hden,
      gnum,
      gden,
      overshoot,
      settlingTime,
      varSteadyState,
      riseTime,
      peakTime,
      load,
      showChartAnalysis,
    });
  };

  useEffect(() => {
    (async () => {
      if (sendInfo) {
        if (sendInfo.load === true) {
          setShowChartAnalysis(false);
          setShowLoading(true);
        }
        console.log("send info", sendInfo);

        try {
          const { data } = await api.post("/analysis", {
            ...sendInfo,
          });
          console.log("Response: ", data);

          setShowLoading(false);
          setDataAnalysis(data);
          setShowChartAnalysis(true);
          history.push("/analysis");
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [sendInfo]);

  return (
    <>
      <Grid fluid={true}>
        <Row>
          <Col className="helpBox" md={3}>
            <Row className="help">
              <Col className="helpText" md={10}>
                <HelpText>
                  Insira as respectivas funções de transferência do processo e
                  do controlador
                </HelpText>
              </Col>
            </Row>

            <Row className="helpText">
              <Col md={10}>
                <HelpText>
                  Insira as especificações do sistema em malha fechada
                </HelpText>
              </Col>
            </Row>
          </Col>

          <Col className="pinkBox" md={8}>
            <StyledBox>
              <TitlesWrapper className="titles">
                <SubTitle>Controlador</SubTitle>
                <SubTitle>Processo</SubTitle>
              </TitlesWrapper>
              <form onSubmit={onSubmit}>
                <Wrapper className="numerador">
                  <InputTitle>Numerador</InputTitle>
                  <GapWrapper>
                    <Input
                      type="text"
                      placeholder="Exemplo: 1"
                      value={gnum}
                      data-test="gnum"
                      onChange={(e) => setGnum(e.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Exemplo: 1,2"
                      value={hnum}
                      data-test="hnum"
                      onChange={(e) => setHnum(e.target.value)}
                    />
                  </GapWrapper>
                  <InputTitle>Numerador</InputTitle>
                </Wrapper>

                <Wrapper className="denominador">
                  <InputTitle>Denominador</InputTitle>
                  <GapWrapper>
                    <Input
                      type="text"
                      placeholder="Exemplo: 1,2"
                      value={gden}
                      data-test="gden"
                      onChange={(e) => setGden(e.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Exemplo: 1,2,3"
                      value={hden}
                      data-test="hden"
                      onChange={(e) => setHden(e.target.value)}
                    />
                  </GapWrapper>

                  <InputTitle>Denominador</InputTitle>
                </Wrapper>

                <BlockDiagram />

                <TitlesWrapper>
                  <SubTitle>Especificações</SubTitle>
                </TitlesWrapper>
                <Wrapper>
                  <InputWrapper>
                    <InputTitle>Tempo de subida máximo (s)</InputTitle>
                    <Input
                      type="text"
                      placeholder="Exemplo: 1.2"
                      value={riseTime}
                      data-test="riseTime"
                      onChange={(e) => setRiseTime(e.target.value)}
                    />
                  </InputWrapper>
                  <InputWrapper>
                    <InputTitle>Tempo de acomodação máximo (s)</InputTitle>
                    <Input
                      type="text"
                      placeholder="Exemplo: 3.2"
                      value={settlingTime}
                      data-test="settlingTime"
                      onChange={(e) => setSettlingTime(e.target.value)}
                    />
                  </InputWrapper>
                  <InputWrapper>
                    <InputTitle>Tempo de pico máximo (s)</InputTitle>
                    <Input
                      type="text"
                      placeholder="Exemplo: 2.1"
                      value={peakTime}
                      data-test="peakTime"
                      onChange={(e) => setPeakTime(e.target.value)}
                    />
                  </InputWrapper>
                </Wrapper>
                <PercWrapper>
                  <InputWrapper>
                    <InputTitle>Variação em regime permanente (%)</InputTitle>
                    <Input
                      type="text"
                      placeholder="Exemplo: 1"
                      value={varSteadyState}
                      data-test="varSS"
                      onChange={(e) => setVarSteadyState(e.target.value)}
                    />
                  </InputWrapper>

                  <InputWrapper>
                    <InputTitle>Overshoot máximo (%)</InputTitle>
                    <Input
                      type="text"
                      placeholder="Exemplo: 18"
                      value={overshoot}
                      data-test="overshoot"
                      onChange={(e) => setOvershoot(e.target.value)}
                    />
                  </InputWrapper>
                  <ButtonWrapper>
                    <Button
                      type="submit"
                      data-test="submit"
                      disabled={
                        !hnum.match(/[0-9]+$/) ||
                        !hden.match(/[0-9]+$/) ||
                        !gnum.match(/[0-9]+$/) ||
                        !gden.match(/[0-9]+$/) ||
                        !riseTime.match(/[0-9]+$/) ||
                        !settlingTime.match(/[0-9]+$/) ||
                        !peakTime.match(/[0-9]+$/) ||
                        !overshoot.match(/[0-9]+$/) ||
                        !varSteadyState.match(/[0-9]+$/)
                      }
                      onClick={() => {
                        setLoad(true);
                      }}
                    >
                      Enviar
                    </Button>
                  </ButtonWrapper>
                </PercWrapper>
              </form>
            </StyledBox>
          </Col>
          <Col md={1}>
            <StyledQuestion
              size="3%"
              data-cy="iHelp"
              onClick={() => {
                history.push("/help");
              }}
            />
            <StyledInfo
              size="3%"
              data-cy="iAbout"
              onClick={() => {
                history.push("/about");
              }}
            />
            <StyledBack
              size="3%"
              data-cy="iHome"
              onClick={() => {
                history.push("/");
              }}
            />
          </Col>
        </Row>
      </Grid>
      {showLoading && <LoadingPage />}
    </>
  );
};

const StyledBack = styled(IoIosArrowBack)`
  position: absolute;
  top: 4%;
  left: 26%;

  cursor: pointer;

  &:hover {
    color: ${Theme.buttonHover};
  }
`;

const StyledInfo = styled(BsInfoCircle)`
  position: absolute;
  top: 8%;
  right: 19%;

  cursor: pointer;

  &:hover {
    color: ${Theme.buttonHover};
  }
`;

const StyledQuestion = styled(BsQuestionCircle)`
  position: absolute;
  top: 4%;
  right: 19%;

  cursor: pointer;

  &:hover {
    color: ${Theme.buttonHover};
  }
`;

const TitlesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-right: 20px;
  gap: 90px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GapWrapper = styled.div`
  display: flex;
  gap: 150px;
  ${Input} {
    margin: 0.4rem 1.5rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PercWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-right: 370px;
`;

const BlockDiagram = styled(blockDiagram)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 45px;
  margin-top: 30px;
  margin: 30px 0 30px 45px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  ${Button} {
    top: 850px;
  }
`;

const StyledBox = styled.div`
  box-sizing: border-box;
  width: 1041px;
  height: 924px;
  padding: 20px;
  background: ${Theme.lightPink};
  background-size: cover;
  border-radius: 23px;
  z-index: -1;
  margin-top: 1rem;
`;
