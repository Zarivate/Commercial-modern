import { styled } from "styled-components";
import ProductBox from "./ProductBox";

function ProductsGrid({ products }) {
  return (
    <StyledProductsGird>
      {products.map((product) => (
        <ProductBox key={product._id} {...product} />
      ))}
    </StyledProductsGird>
  );
}

export default ProductsGrid;

const StyledProductsGird = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`;
