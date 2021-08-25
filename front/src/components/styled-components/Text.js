import styled from "styled-components";
import { Theme } from "../../config";

export const SubTitle = styled.h2`
  box-sizing: border-box;
  font-size: 2.5rem;

  display: flex;
  align-items: center;
  text-align: center;
  padding: 1rem;
  margin: 1rem;

  /* margin: 1rem 2rem; */

  color: ${Theme.darkBlue};
`;

export const InputTitle = styled.h3`
  position: relative;
  font-size: 28px;
  font-weight: 600;

  display: flex;
  align-items: center;
  text-align: center;

  /* margin: 1rem 0.5rem; */

  color: ${Theme.darkBlue};
`;

export const HelpText = styled.h2`
  box-sizing: border-box;

  font-size: 2.5rem;
  font-weight: bold;

  display: flex;
  justify-content: flex-start;
  align-items: right;
  text-align: right;

  margin: 5rem 0rem 6rem 2rem;

  color: black;
`;

export const StyledText = styled.h4`
  position: relative;
  font-size: 18px;
  font-weight: 600;

  display: flex;
  align-items: center;
  text-align: center;

  margin: 0 0.5rem;

  color: ${Theme.darkBlue};
`;
