import React from "react";
import CategorySingle from "./CategorySingle";
import { styled } from "styled-components";

function CategoriesDisplay({ categories }) {
  return (
    <>
      <CategoriesGird>
        {categories.map((category) => (
          <CategorySingle key={category._id} {...category} />
        ))}
      </CategoriesGird>
    </>
  );
}

export default CategoriesDisplay;

const CategoriesGird = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  padding-bottom: 50px;
`;
