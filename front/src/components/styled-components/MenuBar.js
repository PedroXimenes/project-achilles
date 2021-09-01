import React from "react";
import styled from "styled-components";
import { Theme } from "../../config";
import { Row, Col, Grid } from "react-flexbox-grid";
import { Logo } from "./Logo";
import { useHistory } from "react-router-dom";

export const MenuBar = ({ hasLogo, aboutDisabled, helpDisabled }) => {
  const history = useHistory();
  return (
    <NavBar>
      <Grid fluid={true}>
        <Row>
          <Col>
            {hasLogo && (
              <h1 onClick={() => history.push("/")}>
                <Logo />
              </h1>
            )}
          </Col>
          <Col>
            <NavText
              disabled={aboutDisabled}
              data-cy="about"
              onClick={() => history.push("/about")}
            >
              Sobre
            </NavText>
          </Col>
          <Col>
            <NavText
              disabled={helpDisabled}
              data-cy="help"
              onClick={() => history.push("/help")}
            >
              Ajuda
            </NavText>
          </Col>
        </Row>
      </Grid>
    </NavBar>
  );
};

const NavBar = styled.div`
  position: absolute;
  /* display: fixed; */
  width: 100%;
  height: 7.5rem;
  left: 0;
  top: 0;
  background: rgba(253, 152, 44, 0.4);
  ${(props) => props.analysisTheme && { background: Theme.darkBlue }};
`;

const NavText = styled.h4`
  position: relative;
  width: 100px;
  height: 50px;
  font-size: 1.6rem;
  font-weight: 500;
  box-sizing: border-box;

  margin: 2rem 2.8rem;
  left: 90rem;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  color: ${Theme.darkBlue};
  cursor: pointer;
  ${(props) => props.analysisTheme && { color: Theme.white }};

  border-radius: 20px;

  ${(props) => props.disabled && { color: Theme.white, cursor: "default" }};
  ${(props) =>
    props.disabled &&
    props.analysisTheme && { color: "#00ACFF", cursor: "default" }};

  &:focus,
  &:hover {
    background: #ffe2bd;
    ${(props) => props.analysisTheme && { background: "#4b809a" }};
    ${(props) => props.disabled && { background: "none" }};
  }
`;
