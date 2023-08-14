import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Button from "@/components/PrimaryButton";
import ProductImage from "@/components/ProductImage";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import CartIcon from "@/icons/CartIcon";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";
import React, { useContext } from "react";
import { styled } from "styled-components";

function IndividualProductPage({ product }) {
  // Grab the cart context function
  const { addProducts } = useContext(CartContext);

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImage images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <Price>${product.price}</Price>
              <div>
                <Button $primary onClick={() => addProducts(product._id)}>
                  <CartIcon /> Add to Cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}

export default IndividualProductPage;

export async function getServerSideProps(context) {
  await mongooseConnect();

  // Get the product id from the url
  const { id } = context.query;

  // Get the individual product details by serching for it's id within the model on the backend
  const product = await Product.findById(id);

  // Return the contents
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin: 40px 0;

  @media screen and (min-width: 768px) {
    grid-template-columns: 0.9fr 1.1fr;
  }
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.4rem;
`;
