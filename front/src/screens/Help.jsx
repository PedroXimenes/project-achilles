import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Theme } from "../config";
import {
  StyledTitle,
  StyledText,
  InputTitle,
  MenuBar,
} from "../components/styled-components";
import MathJax from "react-mathjax-preview";
import clStep from "../imgs-ac/graficos/clstep.png";
import { RiErrorWarningFill, RiCheckboxCircleFill } from "react-icons/ri";

export const Help = () => {
  const [systemShow, setSystemShow] = useState("");

  useEffect(() => {
    const system_num = "s - 2";
    const system_den = "s^2 + 2s + 3";

    const system = `\`(${system_num})/(${system_den})\``;

    const mathSystem = String.raw`${system}`;
    setSystemShow(mathSystem);
  }, []);

  return (
    <>
      <MenuBar hasLogo helpDisabled />
      <Wrapper>
        <StyledTitle>ACHILLES CONTROL</StyledTitle>
        <RowWrapper>
          <StyledBox>
            <Text>Para que serve?</Text>
            <Space />
            <StyledText>
              Achilles Control é uma ferramenta gratuita e de fácil utilização
              para auxiliar projetos de controlador para sistemas lineares.
            </StyledText>
            <Space />

            <Text>Como utilizo?</Text>
            <Space />

            <StyledText>
              O usuário deve inserir as funções de transferência do processo, do
              controlador projetado e as especificações requisitadas do sistema
              de controle linear.
            </StyledText>
            <Space />

            <Text>Quais são os resultados?</Text>
            <Space />

            <StyledText>
              Serão obtidos os gráficos de resposta ao degrau do sistema em
              malha aberta e fechada (sem e com realimentação), o lugar das
              raízes e o diagrama de Bode. Esses gráficos são fundamentais para
              verificar se o controlador é adequado para o sistema.
            </StyledText>
            <Space />

            <Text>Quais os formatos para inserção de dados?</Text>
            <Space />

            <StyledText>
              Ponto: utilizado para números decimais, exemplo: 10.25, 5.55, 12.1
            </StyledText>
            <StyledText>
              Vírgula: utilizada para separar termos, exemplo: s + 2 = 1,2
            </StyledText>
            <StyledText>
              Logo, se você inserir 1.5, 2.3, 1, terá como resultado = 1.5s² +
              2.3s + 1
            </StyledText>
            <Space />

            <Text>Legenda das especificações</Text>
            <Space />
            <InputWrapper>
              <RiCheckboxCircleFill color="green" size={20} />
              <StyledText>
                O sistema em malha fechada corresponde a especificação
              </StyledText>
            </InputWrapper>
            <InputWrapper>
              <RiErrorWarningFill color="red" size={20} />
              <StyledText>
                O sistema em malha fechada não corresponde a especificação
              </StyledText>
            </InputWrapper>
          </StyledBox>

          <StyledWrapper>
            <Text>Como insiro uma Função de Transferência?</Text>
            <Space />
            <InputWrapper>
              <NumDen>
                <InputWrapper>
                  <StyledText>Numerador</StyledText>
                  <InputEx>1,-2</InputEx>
                </InputWrapper>
                <InputWrapper>
                  <StyledText>Denominador</StyledText>
                  <InputEx>1,2,3</InputEx>
                </InputWrapper>
              </NumDen>
              <StyledMath math={systemShow} />
            </InputWrapper>
            <Space />
            <Text>Como confiro se o sistema atende as especificações?</Text>
            <Space />
            <SpWrapper>
              <ClStepImg />
              <Space />

              <StyledText>
                Para checar se o sistema em malha fechada atende as
                especificações requisitadas, clique no botão ‘Check Bounds’.
              </StyledText>
            </SpWrapper>
          </StyledWrapper>
        </RowWrapper>
      </Wrapper>
    </>
  );
};

const SpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
`;

const ClStepImg = styled.img.attrs({
  src: clStep,
  alt: "",
})`
  width: 24rem;
  height: 17rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledMath = styled(MathJax)`
  font-size: 20px;
  padding: 0 1.5rem;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NumDen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  text-align: right;
`;

const InputEx = styled.div`
  box-sizing: border-box;
  background: white;
  border: white;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;

  width: 148px;
  outline: none;
  height: 3rem;
  padding: 8px 12px;
  font-size: 18px;
  border-radius: 1rem;
  margin: 0.5rem 0.5rem;
  box-shadow: inset 0px 0px 10px rgba(10, 62, 87, 0.5);
`;

const Wrapper = styled.div`
  margin: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;

  background: ${Theme.lightGray};
  border-radius: 20px;
  padding: 2%;
  margin: 0 2.5%;
  width: 50%;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  padding: 2%;
  width: 50%;
`;

const Text = styled(InputTitle)`
  font-size: 24px;
  font-weight: bold;
`;

const Space = styled.div`
  height: 18px;
`;
