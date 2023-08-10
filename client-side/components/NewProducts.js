import React from "react";
import { styled } from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";

function NewProducts({ products }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGird>
        {products.map((product) => (
          <ProductBox {...product} />
        ))}
      </ProductsGird>
    </Center>
  );
}

export default NewProducts;

const ProductsGird = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 20px 0 20px;
  font-weight: 600;
`;
