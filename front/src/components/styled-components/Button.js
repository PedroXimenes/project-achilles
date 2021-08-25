import styled from "styled-components";
import { Theme } from "../../config";

export const Button = styled.button`
  outline: none;
  position: absolute;
  width: 24rem;
  height: 6.25rem;
  background: ${Theme.pink};
  border: none;
  border-radius: 1.5rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-weight: bold;
  color: white;

  a {
    color: white;
    text-decoration: none;
  }

  &:focus,
  &:hover {
    background: #c94721;
  }

  &:disabled {
    background: #cccccc;
  }
`;
