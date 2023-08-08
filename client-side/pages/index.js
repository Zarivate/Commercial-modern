import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { Product } from "@/models/Products";
import { mongooseConnect } from "@/lib/mongoose";
import React from "react";
import NewProducts from "@/components/NewProducts";

function HomePage({ featuredProduct, recentProducts }) {
  console.log(recentProducts);

  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={recentProducts} />
    </div>
  );
}

export default HomePage;

export async function getServerSideProps() {
  const sampleProductId = "64b4bf95d5ab4d8c23f1263d";
  await mongooseConnect();
  const featuredProduct = await Product.findById(sampleProductId);
  // Retrieve the latest products, with all their fields, in order of their ids in reverse order, with at most 10 results if there is more
  const recentProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return {
    // Because a prop passed from getServerSideProps to the page props has to be an object compatible with JSON. Mongoose
    // model documents are not be default so instead it will be strignified first then parsed afterwards to be returned as
    // a proper object instead of just a string
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      recentProducts: JSON.parse(JSON.stringify(recentProducts)),
    },
  };
}
