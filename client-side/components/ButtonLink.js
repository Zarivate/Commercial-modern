// Styled component for buttons that require links to specific pages
import React from "react";
import Link from "next/link";
import { styled } from "styled-components";
import { BtnStyle } from "./PrimaryButton";

function ButtonLink(props) {
  return <StyledBtnLink {...props} />;
}

export default ButtonLink;

const StyledBtnLink = styled(Link)`
  ${BtnStyle}
`;
