import Link from "next/link";
import React, { useContext, useState } from "react";
import { styled } from "styled-components";
import Center from "./Center";
import { CartContext } from "./CartContext";
import HamburgerNav from "@/icons/HamburgerNav";

function Header() {
  // Retrieve the contents of the cart using the created CartContext
  const { cartProducts } = useContext(CartContext);

  const [navMenu, setNavMenu] = useState(false);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Ecommerce</Logo>
          <SpacedNav $navMenu={navMenu}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
          </SpacedNav>
          <NavButton onClick={() => setNavMenu(!navMenu)}>
            <HamburgerNav />
          </NavButton>
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
  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  font-size: 1.2rem;
  @media screen and (min-width: 768px) {
    padding: 0;
    font-size: 1rem;
  }
`;

const SpacedNav = styled.nav`
  ${(props) => (props.$navMenu ? `display: block;` : `display: none;`)}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 35px;
  height: 35px;
  border: 0;
  cursor: pointer;
  color: white;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
