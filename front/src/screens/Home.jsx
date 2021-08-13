import React from "react";
import styled from "styled-components";
import { Row, Col, Grid } from "react-flexbox-grid";
import { Link, useHistory } from "react-router-dom";

import step from "../imgs-ac/graficos/step.png";
import bode from "../imgs-ac/graficos/bode.png";
import roots from "../imgs-ac/graficos/roots.png";
import { useScroll } from "../config";
import {
  StyledBackImg,
  Title,
  MenuBar,
  Button,
} from "../components/styled-components";

export const Home = () => {
  const [blockScroll] = useScroll();
  const history = useHistory();
  blockScroll();
  return (
    <>
      {/* <Grid fluid={false}>
        <Row>
          <Col md={6}> */}
      <MenuBar />
      {/* </Col>
        </Row> */}
      <Wrapper>
        {/* <Row>
            <Col md={6}> */}
        <Title />
        {/* </Col>
          </Row>
          <Row>
            <Col md={6}> */}
        <Button>
          <Link to="/inputs">Começar</Link>
        </Button>
        {/* </Col>
          </Row> */}
      </Wrapper>
      {/* <Row>
          <Col md={3}> */}
      <StepImg />
      <BodeImg />
      <RootsImg />
      {/* </Col>
        </Row>
      </Grid> */}
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  left: 2rem;
  top: 1rem;

  ${Button} {
    left: 18rem;
  }
`;

const StepImg = styled.img.attrs({
  src: step,
  alt: "",
})`
  position: relative;
  width: 20.5rem;
  height: 12.25rem;
  left: 100rem;
  top: 43rem;

  transform: rotate(10.44deg);
`;

const BodeImg = styled.img.attrs({
  src: bode,
  alt: "",
})`
  position: relative;
  width: 20.5rem;
  height: 12.25rem;
  left: 75rem;
  top: 50rem;

  transform: rotate(-9.64deg);
`;

const RootsImg = styled.img.attrs({
  src: roots,
  alt: "",
})`
  position: relative;
  width: 20.5rem;
  height: 12.25rem;
  left: 38rem;
  top: 55rem;
`;
