import styled from "styled-components";
import homeImg from "../../imgs-ac/home-background/home.png";
import { width, height } from "../../config";

export const StyledBackImg = styled.div`
  position: absolute;
  width: ${width}px;
  height: ${height}px;

  background: url(${homeImg});
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
  z-index: -1;
`;
