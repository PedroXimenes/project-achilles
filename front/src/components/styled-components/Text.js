import styled from "styled-components";
import { Theme } from "../../config";

export const SubTitle = styled.h2`
  /* position: relative; */
  font-size: 2.5rem;

  display: flex;
  align-items: center;
  text-align: center;

  margin: 1rem 2rem;

  color: ${Theme.darkBlue};
`;

export const InputTitle = styled.h3`
  position: relative;
  font-size: 2rem;
  font-weight: 600;

  display: flex;
  align-items: center;
  text-align: center;

  margin: 1rem 0.5rem;

  color: ${Theme.darkBlue};
`;

export const HelpText = styled.h1`
  box-sizing: border-box;
  position: relative;
  font-size: 2.5rem;
  font-weight: bold;
  width: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: right;
  text-align: right;
  left: 5rem;

  margin: 2rem 0.5rem;

  color: black;
`;
