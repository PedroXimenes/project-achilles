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
import { Link } from "react-router-dom";

export const Inputs = () => {
  return (
    <>
      <Grid fluid={true}>
        <Row>
          <Row className="firstLine" md={4}>
            <Col className="helpText" md={2}>
              <HelpText>
                Insira as respectivas funções de transferência do processo e do
                controlador
              </HelpText>
            </Col>

            {/* <Row className="CtrlPro"> */}
            <SubTitleWrapper>
              <Col md={3}>
                <SubTitle>Controlador</SubTitle>
              </Col>
              <Col md={3}></Col>
              <Col md={3}>
                <SubTitle>Processo</SubTitle>
              </Col>
            </SubTitleWrapper>
            {/* </Row> */}

            <Row className="Num">
              <Wrapper>
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
              </Wrapper>
            </Row>

            <Row className="Den">
              <Wrapper>
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
              </Wrapper>
            </Row>
          </Row>

          <Row className="diagram" md={4}>
            <Col md={12}>
              <BlockDiagram />
            </Col>
          </Row>

          <Row className="esp" md={4}>
            <Col md={2}>
              <HelpText>
                Insira as especificações do sistema em malha fechada
              </HelpText>
            </Col>
            <Wrapper>
              <Col md={10}>
                <SubTitle>Especificações</SubTitle>
              </Col>
            </Wrapper>

            <Row className="tempos">
              <Wrapper>
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
              </Wrapper>
            </Row>

            <Row className="perc">
              <Wrapper>
                <Col md={4}>
                  <InputTitle>Variação em regime permanente (%)</InputTitle>
                  <Input />
                </Col>
                <Col md={4}>
                  <InputTitle>Overshoot máximo (%)</InputTitle>
                  <Input />
                </Col>
                <Col md={4}></Col>
              </Wrapper>
            </Row>

            <Row className="button">
              <Wrapper>
                <Col md={12}>
                  <Button>
                    <Link to="/about">Enviar</Link>
                  </Button>
                </Col>
              </Wrapper>
            </Row>
          </Row>
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
  position: relative;
  margin-left: 50rem;
  width: 65%;
  height: 120%;
`;
