import React, { useState } from "react";
import { styled } from "styled-components";

// Component that handles showcasing all the images of a product that's displayed below the main image on a product's page
function ProductImage({ images }) {
  // State to handle which image to be the main product image
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      <BigImageWrapper>
        <MainImage src={activeImage} />
      </BigImageWrapper>
      <SmallerImages>
        {images.map((image) => (
          <IndividualImage
            key={image}
            active={image === activeImage}
            src={image}
            alt=""
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} alt="" />
          </IndividualImage>
        ))}
      </SmallerImages>
    </>
  );
}

export default ProductImage;

const SmallerImages = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`;

const IndividualImage = styled.div`
  border: 3px solid #ccc;
  ${(props) =>
    props.active
      ? `
      border-color: #ccc;
    `
      : `
      border-color: transparent;
    `}
  height: 40px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const MainImage = styled.img`
  max-width: 100%;
  max-height: 200px;
`;

const BigImageWrapper = styled.div`
  text-align: center;
`;
