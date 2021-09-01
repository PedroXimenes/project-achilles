import React, { useEffect, useState } from "react";
import MathJax from "react-mathjax-preview";
import styled from "styled-components";
import { useDataContext } from "./DataContext";
import { InputTitle, Button } from "./styled-components";
import { useScroll } from "../config";
import { useHistory } from "react-router";

const ShowInput = ({ input_data, scroll }) => {
  const [systemShow, setSystemShow] = useState("");
  const [controllerShow, setControllerShow] = useState("");
  const [clShow, setClShow] = useState("");
  const { dataAnalysis } = useDataContext();
  const [blockScroll, allowScroll] = useScroll();
  const history = useHistory();

  if (scroll) {
    blockScroll();
  } else {
    allowScroll();
  }
  useEffect(() => {
    if (input_data.hnum) {
      let hnum = input_data.hnum;
      let hden = input_data.hden;
      let gnum = input_data.gnum;
      let gden = input_data.gden;
      let clNum = dataAnalysis.cl_num;
      let clDen = dataAnalysis.cl_den;

      const strToArray = (text) => {
        let array = [];
        let value;
        let myStr = text.split(",");
        for (let i = 0; i < myStr.length; i++) {
          value = parseFloat(myStr[i]);
          if (!isNaN(value)) {
            array.push(value);
          }
          continue;
        }
        return array;
      };
      const Hn = strToArray(hnum);
      const Hd = strToArray(hden);
      const Gn = strToArray(gnum);
      const Gd = strToArray(gden);
      const Cln = strToArray(clNum);
      const Cld = strToArray(clDen);

      const formatMathExpression = (value) => {
        let mathExpression = "";
        let numberExpression = "";
        let power = value.length - 1;
        for (let i = 0; i < value.length; i++) {
          numberExpression = ` ${value[i]}s^${power} `;
          if (value[i] === 0) {
            numberExpression = numberExpression.replace(
              `${value[i]}s^${power}`,
              ""
            );
          }
          if (value[i] > 0 && i > 0) {
            numberExpression = ` + ${value[i]}s^${power} `;
          }
          if (power === 1) {
            numberExpression = numberExpression.replace(`^${power}`, "");
          }
          if (Math.abs(value[i]) === 1 && value.length > 1 && power !== 0) {
            numberExpression = numberExpression.replace(1, "");
          }
          mathExpression += numberExpression;
          power--;
        }

        mathExpression = mathExpression.replace("s^0", "");
        console.log(mathExpression);
        return mathExpression;
      };
      const system_num = formatMathExpression(Hn);
      const system_den = formatMathExpression(Hd);

      const controller_num = formatMathExpression(Gn);
      const controller_den = formatMathExpression(Gd);

      const closedLoop_num = formatMathExpression(Cln);
      const closedLoop_den = formatMathExpression(Cld);

      const system = `\`(${system_num})/(${system_den})\``;
      const controller = `\`(${controller_num})/(${controller_den})\``;
      const closedLoop = `\`(${closedLoop_num})/(${closedLoop_den})\``;

      const mathSystem = String.raw`${system}`;
      const mathController = String.raw`${controller}`;
      const mathClosedLoop = String.raw`${closedLoop}`;

      setSystemShow(mathSystem);
      setControllerShow(mathController);
      setClShow(mathClosedLoop);
    }
  }, [input_data, dataAnalysis]);
  return (
    <>
      <InputWrapper>
        <Wrapper className="showInput">
          <StyledTitle>Processo</StyledTitle>
          <StyledMath math={systemShow} />
          <StyledTitle>Controlador</StyledTitle>
          <StyledMath math={controllerShow} />
          <StyledTitle>Malha Fechada</StyledTitle>
          <StyledMath math={clShow} />
        </Wrapper>
        <StyledButton
          onClick={() => {
            history.push("/inputs");
          }}
        >
          Alterar entradas
        </StyledButton>
      </InputWrapper>
    </>
  );
};

export default ShowInput;

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 130%;
  height: 130%;
  padding: 10% 5%;
  border-radius: 20px;
  background: #f5f5f5;
  margin-bottom: 50px;
`;

const StyledTitle = styled(InputTitle)`
  font-weight: bold;
  margin: 10% 0;
`;

const StyledMath = styled(MathJax)`
  font-size: 20px;
`;

export const StyledButton = styled(Button)`
  width: 10%;
  height: 39px;
  font-size: 18px;
  border-radius: 23px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  margin-left: 10%;
`;
