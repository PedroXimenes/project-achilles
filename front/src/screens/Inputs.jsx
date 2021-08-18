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
              <Row top={"md"} around={"md"}>
                <Row className="Titles">
                  <Col md={5}>
                    <SubTitle>Controlador</SubTitle>
                  </Col>
                  <Col md={2} />
                  <Col md={5}>
                    <SubTitle>Processo</SubTitle>
                  </Col>
                </Row>
                <Row center={"md"}>
                  <Row className="Num" middle={"md"}>
                    <Col md={3}>
                      <InputTitle>Numerador</InputTitle>
                    </Col>
                    <Col md={3}>
                      <Input />
                    </Col>
                    <Col md={3}>
                      <Input />
                    </Col>
                    <Col md={3}>
                      <InputTitle>Numerador</InputTitle>
                    </Col>
                  </Row>

                  <Row className="Den" middle={"md"}>
                    <Col md={3}>
                      <InputTitle>Denominador</InputTitle>
                    </Col>
                    <Col md={3}>
                      <Input />
                    </Col>
                    <Col md={3}>
                      <Input />
                    </Col>
                    <Col md={3}>
                      <InputTitle>Denominador</InputTitle>
                    </Col>
                  </Row>
                </Row>
                <Row className="diagram">
                  <Col md={12}>
                    <BlockDiagram />
                  </Col>
                </Row>

                <Row className="esp">
                  <Col md={12} center={"md"}>
                    <SubTitle>Especificações</SubTitle>
                  </Col>
                </Row>

                <Row className="tempos">
                  <Col md={1} />
                  <Col md={3}>
                    <InputTitle>Tempo de subida máximo (s)</InputTitle>
                    <Input />
                  </Col>
                  <Col md={1} />
                  <Col md={3}>
                    <InputTitle>Tempo de acomodação máximo (s)</InputTitle>
                    <Input />
                  </Col>
                  <Col md={1} />
                  <Col md={3}>
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
              </Row>
            </StyledBox>
            <Row className="button">
              <Col md={6}>
                <Button onClick={() => history.push("/")}>Enviar</Button>
              </Col>
            </Row>
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

const ControlWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;

const BlockDiagram = styled(blockDiagram)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin: auto 2rem;
`;

const StyledBox = styled.div`
  box-sizing: border-box;
  display: fixed;
  width: 90%;
  height: 131%;
  margin: 1.2rem auto;
  padding: 1.2rem;

  background: ${Theme.lightPink};
  background-size: cover;
  border-radius: 23px;
  z-index: -1;
`;
