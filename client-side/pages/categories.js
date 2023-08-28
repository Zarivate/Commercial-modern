import Header from "@/components/Header";
import Center from "@/components/Center";
import Title from "@/components/Title";
import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";
import React from "react";
import CategoriesDisplay from "@/components/CategoriesDisplay";

function Categories({ categories }) {
  return (
    <>
      <Header />
      <Center>
        <Title>All Categories</Title>
        <CategoriesDisplay categories={categories} />
      </Center>
    </>
  );
}

export default Categories;

export async function getServerSideProps() {
  await mongooseConnect();

  const categories = await Category.find({}, null, { sort: { _id: -1 } });
  console.log("Made it here in categories`");
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
