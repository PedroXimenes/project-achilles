import React from "react";
import { Row, Col, Grid } from "react-flexbox-grid";
import styled from "styled-components";
import { ReactComponent as blockDiagram } from "../imgs-ac/blockDiagram.svg";

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

          <Col className="pinkBox" md={9}>
            <StyledBox>
              <TitlesWrapper className="titles">
                <SubTitle>Controlador</SubTitle>
                <SubTitle>Processo</SubTitle>
              </TitlesWrapper>

              <Wrapper className="numerador">
                <InputTitle>Numerador</InputTitle>
                <GapWrapper>
                  <Input />
                  <Input />
                </GapWrapper>
                <InputTitle>Numerador</InputTitle>
              </Wrapper>

              <Wrapper className="denominador">
                <InputTitle>Denominador</InputTitle>
                <GapWrapper>
                  <Input />
                  <Input />
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
                  <Input />
                </InputWrapper>
                <InputWrapper>
                  <InputTitle>Tempo de acomodação máximo (s)</InputTitle>
                  <Input />
                </InputWrapper>
                <InputWrapper>
                  <InputTitle>Tempo de pico máximo (s)</InputTitle>
                  <Input />
                </InputWrapper>
              </Wrapper>
              <PercWrapper>
                <InputWrapper>
                  <InputTitle>Variação em regime permanente (%)</InputTitle>
                  <Input />
                </InputWrapper>

                <InputWrapper>
                  <InputTitle>Overshoot máximo (%)</InputTitle>
                  <Input />
                </InputWrapper>
                <ButtonWrapper>
                  <Button onClick={() => history.push("/")}>Enviar</Button>
                </ButtonWrapper>
              </PercWrapper>
            </StyledBox>
          </Col>
        </Row>
      </Grid>
    </>
  );
};

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
