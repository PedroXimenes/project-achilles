import styled from "styled-components";

export const Input = styled.input`
  box-sizing: border-box;
  background: white;
  border: white;
  width: 80%;
  outline: none;
  height: 4rem;
  padding: 8px 12px;
  font-size: 20px;
  border-radius: 1rem;
  transition: all ease 0.4s;
  margin: 1rem 0.5rem;
  box-shadow: inset 0px 0px 10px rgba(10, 62, 87, 0.5);

  &:focus {
    border-color: grey;
    border-style: dotted;
  }

  &::placeholder {
    color: #ccc;
    font-style: italic;
    font-family: sans-serif;
  }
`;
