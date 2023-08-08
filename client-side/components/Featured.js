import React from "react";
import Center from "./Center";
import { styled } from "styled-components";
import Button from "./PrimaryButton";
import ButtonLink from "./ButtonLink";
import CartIcon from "@/icons/CartIcon";

function Featured({ product }) {
  return (
    <StyledDiv>
      <Center>
        <Wrapper>
          <ColumnDiv>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonWrapper>
                <ButtonLink
                  href={`/products/${product._id}`}
                  outline="true"
                  white="true"
                >
                  Read more
                </ButtonLink>
                <Button $primary="true">
                  <CartIcon />
                  Add to cart
                </Button>
              </ButtonWrapper>
            </div>
          </ColumnDiv>
          <ColumnDiv>
            <img
              src="https://nextjs-ecommerce-test.s3.amazonaws.com/1689224694989.jpg"
              alt="test-image"
            />
          </ColumnDiv>
        </Wrapper>
      </Center>
    </StyledDiv>
  );
}

export default Featured;

const StyledDiv = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.9rem;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 40px;
  img {
    max-width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

const ColumnDiv = styled.div`
  display: flex;
  align-items: center;
`;
