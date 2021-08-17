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
              <Col className="helpText" md={6}>
                <HelpText>
                  Insira as respectivas funções de transferência do processo e
                  do controlador
                </HelpText>
              </Col>
            </Row>

            <Row className="helpText">
              <Col md={6}>
                <HelpText>
                  Insira as especificações do sistema em malha fechada
                </HelpText>
              </Col>
            </Row>
          </Col>

          <Col className="pinkBox" md={9}>
            <StyledBox>
              <Row around={"md"}>
                <Col md={5}>
                  <SubTitle>Controlador</SubTitle>
                </Col>
                <Col md={2} />
                <Col md={5}>
                  <SubTitle>Processo</SubTitle>
                </Col>

                <Row className="Num">
                  <Col md={3}>
                    <InputTitle>Numerador</InputTitle>
                  </Col>
                  <Col md={3}>
                    <Input />
                  </Col>
                  <Col md={3}>
                    <InputTitle>Numerador</InputTitle>
                  </Col>
                  <Col md={3}>
                    <Input />
                  </Col>
                </Row>

                <Row className="Den">
                  <Col md={3}>
                    <InputTitle>Denominador</InputTitle>
                  </Col>
                  <Col md={3}>
                    <Input />
                  </Col>
                  <Col md={3}>
                    <InputTitle>Denominador</InputTitle>
                  </Col>
                  <Col md={3}>
                    <Input />
                  </Col>
                </Row>

                <Row className="diagram">
                  <Col md={12}>
                    <BlockDiagram />
                  </Col>
                </Row>

                <Row className="esp">
                  <Col md={12}>
                    <SubTitle>Especificações</SubTitle>
                  </Col>
                </Row>

                <Row className="tempos">
                  <Col md={4}>
                    <InputTitle>Tempo de subida máximo (s)</InputTitle>
                    <Input />
                  </Col>
                  <Col md={4}>
                    <InputTitle>Tempo de acomodação máximo (s)</InputTitle>
                    <Input />
                  </Col>
                  <Col md={4}>
                    <InputTitle>Tempo de pico máximo (s)</InputTitle>
                    <Input />
                  </Col>
                </Row>

                <Row className="perc">
                  <Col md={4}>
                    <InputTitle>Variação em regime permanente (%)</InputTitle>
                    <Input />
                  </Col>
                  <Col md={4}>
                    <InputTitle>Overshoot máximo (%)</InputTitle>
                    <Input />
                  </Col>
                  <Col md={4} />
                </Row>
                <Row>
                  <Col>
                    <Button onClick={() => history.push("/")}>Enviar</Button>
                  </Col>
                </Row>
              </Row>
            </StyledBox>
          </Col>
        </Row>
      </Grid>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 50rem;
`;

const SubTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 50rem;
`;

const BlockDiagram = styled(blockDiagram)`
  /* position: relative; */
  /* margin-left: 50rem; */
  width: 65%;
  height: 120%;
`;

const StyledBox = styled.div`
  /* position: absolute; */
  display: fixed;
  width: 100%;
  height: 131%;
  margin-top: 1.2rem;
  /* left: 364px;
  top: 50px; */

  background: ${Theme.lightPink};
  /* background-repeat: no-repeat; */
  /* background-position: bottom; */
  background-size: cover;
  z-index: -1;
  /* filter: blur(5px); */
  border-radius: 23px;
  z-index: -1;
`;
