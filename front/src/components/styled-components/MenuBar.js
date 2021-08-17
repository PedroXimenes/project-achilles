import React from "react";
import styled from "styled-components";
import { Theme } from "../../config";
import { Row, Col, Grid } from "react-flexbox-grid";
import { Logo } from "./Logo";
import { useHistory } from "react-router-dom";

export const MenuBar = ({ hasLogo }) => {
  const history = useHistory();
  return (
    <NavBar>
      <Grid fluid={true}>
        <Row>
          <Col>{hasLogo && <Logo onClick={() => history.push("/home")} />}</Col>
          <Col>
            <NavText onClick={() => history.push("/about")}>Sobre</NavText>
          </Col>
          <Col>
            <NavText onClick={() => history.push("/help")}> Ajuda</NavText>
          </Col>
        </Row>
      </Grid>
    </NavBar>
  );
};

const NavBar = styled.div`
  position: absolute;
  width: 100%;
  height: 7.5rem;
  left: 0;
  top: 0;
  z-index: 1000000;

  background: rgba(253, 152, 44, 0.4);
`;

const NavText = styled.h4`
  position: relative;
  font-size: 1.6rem;
  font-weight: 500;
  box-sizing: border-box;

  left: 90rem;
  top: 2.8rem;

  margin: 0 2.8rem;

  display: flex;
  align-items: center;
  text-align: center;

  color: ${Theme.darkBlue};
  cursor: pointer;
`;
