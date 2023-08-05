// This component is just to help center anything depending on the screen size
import React from "react";
import { styled } from "styled-components";

function Center({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}

export default Center;

const StyledDiv = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;
