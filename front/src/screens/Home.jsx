import React from "react";
import styled from "styled-components";
import { Row, Col, Grid } from "react-flexbox-grid";
import { useHistory } from "react-router-dom";

import {
  BackImg,
  Title,
  MenuBar,
  Button,
} from "../components/styled-components";

export const Home = () => {
  const history = useHistory();
  return (
    <>
      <BackImg />
      <Grid fluid={false}>
        <Row>
          <Col md={6}>
            <MenuBar />
          </Col>
        </Row>
        <Wrapper>
          <Row>
            <Col md={6}>
              <Title />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Button data-cy="start" onClick={() => history.push("/inputs")}>
                Começar
              </Button>
            </Col>
          </Row>
        </Wrapper>
        <Row>
          <Col md={3}></Col>
        </Row>
      </Grid>
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  left: 2rem;
  top: 1rem;

  ${Button} {
    left: 18rem;
    top: 40rem;
  }
`;
