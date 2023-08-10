import React, { useContext } from "react";
import { styled } from "styled-components";
import Button from "./PrimaryButton";
import Link from "next/link";
import { CartContext } from "./CartContext";

function ProductBox({ _id, title, description, price, images }) {
  const productUrl = `/product/${_id}`;

  const { addProducts } = useContext(CartContext);
  return (
    <ProductWrapper>
      <Box href={productUrl}>
        <div>
          <img src={images[0]} alt="" />
        </div>
      </Box>
      <ProductInfoBox>
        <Title href={productUrl}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button $primary $outline onClick={() => addProducts(_id)}>
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}

export default ProductBox;

const Box = styled(Link)`
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

const Title = styled(Link)`
  font-weight: bold;
  font-size: 0.9rem;
  margin: 0;
  text-align: center;
  color: inherit;
  text-decoration: none;
  margin-bottom: 5px;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
  text-align: center;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;

const ProductWrapper = styled.div``;
