import React from "react";
import { styled } from "styled-components";
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";

function NewProducts({ products }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid products={products} />
    </Center>
  );
}

export default NewProducts;

const Title = styled.h2`
  font-size: 2rem;
  margin: 20px 0 20px;
  font-weight: 600;
`;
