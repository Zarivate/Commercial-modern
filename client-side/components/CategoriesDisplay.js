import React from "react";
import CategorySingle from "./CategorySingle";
import { styled } from "styled-components";
import Select from "react-select";
import { useEffect } from "react";

function CategoriesDisplay({ categories }) {
  const options = [];

  useEffect(() => {
    categories.map((category) => {
      options.push({ value: category._id, label: category.name });
    });
  }, []);

  console.log(options);
  return (
    <>
      <CategoriesGird>
        <styledSelect options={options} />
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

const styledSelect = styled(Select)`
  display: flex;
  padding: 25px;
`;
