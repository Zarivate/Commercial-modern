import React from "react";
import { css, styled } from "styled-components";

function Button({ children, ...additional }) {
  return <StyledBtn {...additional}>{children}</StyledBtn>;
}

export default Button;

export const BtnStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-weight: semi-bold;
  font-family: "Quicksand", sans-serif;
  svg {
    height: 16px;
    margin-right: 5px;
  }
  ${(props) =>
    props.$block &&
    css`
      display: block;
      width: 100%;
    `}
  /* Depending on the prop passed in, the styling will be slightly changed */
  ${(props) =>
    props.$white &&
    !props.$outline &&
    css`
      background-color: #fff;
      color: #000;
    `}
  ${(props) =>
    props.$white &&
    props.$outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 2px solid #fff;
    `}
    ${(props) =>
    props.$black &&
    !props.$outline &&
    css`
      background-color: #000;
      color: #fff;
    `}
  ${(props) =>
    props.$black &&
    props.$outline &&
    css`
      background-color: transparent;
      color: #000;
      border: 2px solid #000;
    `}
  ${(props) =>
    props.$primary &&
    !props.$outline &&
    css`
      background-color: #5542f6;
      border: 2px solid #5542f6;
      color: #fff;
    `}
    ${(props) =>
    props.$primary &&
    props.$outline &&
    css`
      background-color: transparent;
      border: 2px solid #5542f6;
      color: #5542f6;
    `}
  ${(props) =>
    props.size === "lg" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg {
        height: 20px;
      }
    `}
`;

const StyledBtn = styled.button`
  ${BtnStyle}
`;
