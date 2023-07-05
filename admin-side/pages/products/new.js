// This file will handle adding new products to the site. It will be what appears when an admin clicks the
// "Add new product" button, it will be what appears when the link goes to /products/new
import Layout from "@/components/Layout";
import React from "react";
import ProductForm from "@/components/ProductForm";

function NewProduct() {
  return (
    <Layout>
      <h1>New Product</h1>
      <ProductForm />
    </Layout>
  );
}

export default NewProduct;
