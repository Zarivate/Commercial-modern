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
  svg {
    height: 16px;
    margin-right: 5px;
  }
  /* Depending on the prop passed in, the styling will be slightly changed */
  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
    `}
  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}
  ${(props) =>
    props.$primary &&
    css`
      background-color: #5542f6;
      border: 1px solid #5542f6;
      color: #fff;
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
