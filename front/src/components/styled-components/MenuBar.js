import React from "react";
import styled from "styled-components";
import { Theme } from "../../config";
import { Logo } from "./Logo";
import { useHistory } from "react-router-dom";

export const MenuBar = ({ hasLogo, aboutDisabled, helpDisabled }) => {
  const history = useHistory();
  return (
    <NavBar>
      {hasLogo && (
        <h1 onClick={() => history.push("/")}>
          <Logo />
        </h1>
      )}
      <Wrapper>
        <NavText
          disabled={aboutDisabled}
          data-cy="about"
          onClick={() => history.push("/about")}
        >
          Sobre
        </NavText>

        <NavText
          disabled={helpDisabled}
          data-cy="help"
          onClick={() => history.push("/help")}
        >
          Ajuda
        </NavText>
      </Wrapper>
    </NavBar>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-left: 90rem;
`;

const NavBar = styled.div`
  position: absolute;
  width: 100%;
  height: 7.5rem;
  left: 0;
  top: 0;
  background: rgba(253, 152, 44, 0.4);
  ${(props) => props.analysisTheme && { background: Theme.darkBlue }};
`;

const NavText = styled.h4`
  width: 6.25rem;
  height: 3.15rem;
  font-size: 1.6rem;
  font-weight: 500;
  box-sizing: border-box;

  margin: 2rem 2.8rem;
  /* left: 90rem; */

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
