import React from "react";
import { styled } from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";

function NewProducts({ products }) {
  return (
    <Center>
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
  gap: 30px;
  padding-top: 30px;
`;
