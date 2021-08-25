import React from "react";
import styled from "styled-components";
// import { useHistory } from "react-router-dom";
import { useScroll } from "../config";
import {
  StyledBackImg,
  StyledTitle,
  StyledText,
  InputTitle,
  MenuBar,
} from "../components/styled-components";
import { ReactComponent as CtrlLogo } from "../imgs-ac/ctrl.svg";
import { FiSettings } from "react-icons/fi";
import { AiFillGithub } from "react-icons/ai";
import { GiThreeFriends } from "react-icons/gi";
import { HiOutlineMail } from "react-icons/hi";

export const About = () => {
  const [blockScroll] = useScroll();
  blockScroll();
  // const history = useHistory();
  return (
    <>
      <StyledBackImg />
      <MenuBar hasLogo aboutDisabled />

      <Wrapper>
        <StyledTitle>ACHILLES CONTROL</StyledTitle>

        <InputTitle>
          Ferramenta para auxiliar no projeto de controlador em sistemas de
          controle linear
        </InputTitle>

        <BoxWrapper>
          <StyledBox>
            <WrapperBox>
              <StyledBoxTitle>Recursos oferecidos</StyledBoxTitle>
              <StyledText>
                Possibilidade do usuário analisar o projeto de controle linear e
                verificar se o controlador está obedecendo as especificações
                desejadas
              </StyledText>
              <IconWrapper>
                <Ctrl />
              </IconWrapper>
            </WrapperBox>
          </StyledBox>

          <StyledBox>
            <WrapperBox>
              <StyledBoxTitle>Open Source</StyledBoxTitle>
              <StyledText>
                Contribuição de uma ferramenta gratuita que possa auxiliar
                estudantes de engenharia elétrica e similares
              </StyledText>
              <IconWrapper>
                <AiFillGithub size="12%" />
              </IconWrapper>
            </WrapperBox>
          </StyledBox>

          <StyledBox>
            <WrapperBox>
              <StyledBoxTitle>User Friendly</StyledBoxTitle>
              <StyledText>
                Foco no usuário, para que a plataforma seja de fácil utilização
              </StyledText>
              <IconWrapper>
                <GiThreeFriends size="12%" />
              </IconWrapper>
            </WrapperBox>
          </StyledBox>

          <StyledBox>
            <WrapperBox>
              <StyledBoxTitle>Recursos utilizados</StyledBoxTitle>
              <StyledText>
                Website desenvolvido utilizando Python Flask no back-end da
                aplicação e ReactJs para interface do usuário
              </StyledText>
              <IconWrapper>
                <FiSettings size="12%" />
              </IconWrapper>
            </WrapperBox>
          </StyledBox>
        </BoxWrapper>
        <Foot>
          <StyledText>Fale Conosco:</StyledText>
          <StyledText>Ana Paula Flores de Melo</StyledText>
          <StyledText>Pedro Henrique Oliveira Toscano Ximenes</StyledText>
          <StyledText>Saulo Oliveira Dornellas Luiz</StyledText>
        </Foot>
      </Wrapper>
    </>
  );
};

const Ctrl = styled(CtrlLogo)`
  width: 12%;
  background: none;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 3.5rem 1rem 0 0;
`;

const BoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 7rem 0 4.2rem 0;
`;

const Foot = styled.div`
  box-sizing: border-box;
  width: 130%;
  height: 7rem;
  padding: 1% 10%;
  background: #fda89e;
`;

const Wrapper = styled.div`
  margin: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledBox = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: right;
  background: rgba(216, 127, 127, 0.32);
  border-radius: 20px;
  margin: 0 2rem;
`;

const StyledBoxTitle = styled(InputTitle)`
  font-size: 20px;
  margin-bottom: 10%;
`;

const WrapperBox = styled.div`
  display: flex;
  flex-direction: column;
`;
