import React from "react";
import styled from "styled-components";
import { Theme } from "../../config";
import { ReactComponent as CtrlLogo } from "../../imgs-ac/ctrl.svg";
import { ReactComponent as Arrow } from "../../imgs-ac/arrow.svg";

export const Logo = () => {
  return (
    <>
      <Ctrl />
      <ArrowLogo />
    </>
  );
};

export const CtrlImg = styled(CtrlLogo)`
  box-sizing: border-box;
  position: absolute;

  left: 64rem;
  top: 24rem;
  width: 7rem;
  height: 6.25rem;

  background: ${Theme.white};
  color: ${Theme.gray};
  border-radius: 23px;
`;

export const ArrowImg = styled(Arrow)`
  position: absolute;
  left: 31rem;
  top: 22rem;
  width: 7rem;
  height: 6.25rem;
  fill: solid ${Theme.gray};

  transform: rotate(80.43deg);
`;

const ArrowLogo = styled(Arrow)`
  position: absolute;
  left: 2.4rem;
  top: 0.5rem;
  width: 5rem;
  height: 4.25rem;
  fill: solid ${Theme.gray};

  transform: rotate(80.43deg);
`;

const Ctrl = styled(CtrlLogo)`
  box-sizing: border-box;
  position: absolute;

  left: 5rem;
  top: 2rem;
  width: 5rem;
  height: 4.25rem;
  background: ${Theme.white};
  color: ${Theme.gray};
  border-radius: 1.1rem;
  cursor: pointer;
`;
