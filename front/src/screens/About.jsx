import React from "react";
import styled from "styled-components";
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
import { GrLinkedinOption } from "react-icons/gr";
import { BsDot } from "react-icons/bs";

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
                estudantes de engenharia
              </StyledText>
              <Space />

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
              <Space />
              <Space />

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
                <FiSettings size="11%" />
              </IconWrapper>
            </WrapperBox>
          </StyledBox>
        </BoxWrapper>
        <Foot>
          <FootWrapper>
            <WrapperFoot>
              <FootIconWrapper>
                <GrLinkedinOption
                  cursor="pointer"
                  onClick={() =>
                    window.location.replace(
                      "https://www.linkedin.com/in/ana-paula-flores-de-melo-6328b9152/"
                    )
                  }
                />
                <StyledText>Ana Paula Flores de Melo</StyledText>

                <HiOutlineMail />
                <StyledText>anapaula.flores@ee.ufcg.edu.br</StyledText>
              </FootIconWrapper>
              <FootIconWrapper>
                <GrLinkedinOption
                  cursor="pointer"
                  onClick={() =>
                    window.location.replace(
                      "https://www.linkedin.com/in/pedro-ximenes-763474181/"
                    )
                  }
                />
                <StyledText>Pedro Henrique O. T. Ximenes</StyledText>
                <HiOutlineMail />
                <StyledText>pedro.ximenes@ee.ufcg.edu.br</StyledText>
              </FootIconWrapper>
              <FootIconWrapper>
                <BsDot color="#fda89e" />
                <StyledText>Saulo Oliveira Dornellas Luiz</StyledText>
                <HiOutlineMail />
                <StyledText>saulo@dee.ufcg.edu.br</StyledText>
              </FootIconWrapper>
            </WrapperFoot>

            <GitWrapper
              onClick={() =>
                window.location.replace(
                  "https://github.com/PedroXimenes/project-achilles"
                )
              }
            >
              <StyledText>Achilles Control</StyledText>
              <AiFillGithub size="8%" cursor="pointer" />
            </GitWrapper>
          </FootWrapper>
        </Foot>
      </Wrapper>
    </>
  );
};

const WrapperFoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Ctrl = styled(CtrlLogo)`
  width: 12%;
  background: none;
`;

const Space = styled.div`
  height: 18px;
`;

const IconWrapper = styled.div`
  display: fixed;
  margin: 4rem 1rem 0 0;
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

const FootWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const GitWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const FootIconWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
`;
