import styled from "styled-components";
import homeImg from "../../imgs-ac/home-background/home.png";
import step from "../../imgs-ac/graficos/step.png";
import bode from "../../imgs-ac/graficos/bode.png";
import roots from "../../imgs-ac/graficos/roots.png";
// import { width, height } from "../../config";

export const BackImg = () => {
  return (
    <StyledBackImg>
      <StepImg />
      <BodeImg />
      <RootsImg />
    </StyledBackImg>
  );
};

export const StyledBackImg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(${homeImg});
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
  z-index: -1;
  top: 0;
  overflow: hidden;
`;

const StepImg = styled.img.attrs({
  src: step,
  alt: "",
})`
  position: fixed;
  width: 20.5rem;
  height: 12.25rem;
  left: 100rem;
  top: 43rem;
  transform: rotate(10.44deg);
`;

const BodeImg = styled.img.attrs({
  src: bode,
  alt: "",
})`
  position: fixed;
  width: 20.5rem;
  height: 12.25rem;
  left: 95rem;
  top: 50rem;

  transform: rotate(-9.64deg);
`;

const RootsImg = styled.img.attrs({
  src: roots,
  alt: "",
})`
  position: fixed;
  width: 20.5rem;
  height: 12.25rem;
  left: 80rem;
  top: 55rem;
`;
