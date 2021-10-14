import styled from "styled-components";
import { Theme } from "../../config";

export const StyledTitle = styled.h1`
  box-sizing: border-box;
  font-size: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 2.5rem 0;
  /* padding: 1rem; */
  /* margin: 10rem 0 2.5rem 5rem; */

  color: ${Theme.darkBlue};
`;

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
  justify-content: center;
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
  text-align: left;

  padding: 0 1.5rem;

  color: ${Theme.darkBlue};
`;
