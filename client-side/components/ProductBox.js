import React from "react";
import { styled } from "styled-components";
import Button from "./PrimaryButton";
import CartIcon from "@/icons/CartIcon";

function ProductBox({ _id, title, description, price, images }) {
  return (
    <ProductWrapper>
      <Box>
        <div>
          <img src={images[0]} alt="" />
        </div>
      </Box>
      <ProductInfoBox>
        <Title>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button $primary>
            <CartIcon />
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}

export default ProductBox;

const Box = styled.div`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 100px;
  }
`;

const Title = styled.h2`
  //font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  text-align: center;
  //margin-bottom: 5px;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ProductWrapper = styled.div``;
