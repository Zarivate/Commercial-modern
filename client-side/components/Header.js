import Link from "next/link";
import React, { useContext } from "react";
import { styled } from "styled-components";
import Center from "./Center";
import { CartContext } from "./CartContext";

function Header() {
  // Retrieve the contents of the cart using the created CartContext
  const { cartProducts } = useContext(CartContext);

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
            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
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
