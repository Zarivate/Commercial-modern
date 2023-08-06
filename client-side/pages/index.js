import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { Product } from "@/models/Products";
import { mongooseConnect } from "@/lib/mongoose";
import React from "react";

function HomePage({ product }) {
  return (
    <div>
      <Header />
      <Featured product={product} />
    </div>
  );
}

export default HomePage;

export async function getServerSideProps() {
  const sampleProductId = "64b4bf95d5ab4d8c23f1263d";
  await mongooseConnect();
  const sampleProduct = await Product.findById(sampleProductId);
  return {
    // Because a prop passed from getServerSideProps to the page props has to be an object compatible with JSON. Mongoose
    // model documents are not be default so instead it will be strignified first then parsed afterwards to be returned as
    // a proper object instead of just a string
    props: { product: JSON.parse(JSON.stringify(sampleProduct)) },
  };
}
