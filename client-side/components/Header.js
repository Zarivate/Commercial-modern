import Link from "next/link";
import React from "react";
import { styled } from "styled-components";
import Center from "./Center";

function Header() {
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Ecommerce</Logo>
          <SpacedNav>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/cart"}>Cart</NavLink>
          </SpacedNav>
        </Wrapper>
      </Center>
      {/* Will link just to the main/homepage */}
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
`;

const SpacedNav = styled.nav`
  display: flex;
  gap: 15px;
`;
