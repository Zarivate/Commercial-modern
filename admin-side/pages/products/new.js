// This file will handle adding new products to the site. It will be what appears when an admin clicks the
// "Add new product" button, it will be what appears when the link goes to /products/new
import Layout from "@/components/Layout";
import React, { useState } from "react";

function NewProduct() {
  // States to hold the user input field values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  return (
    <Layout>
      <h1>New Product</h1>
      <label>Product Name</label>
      <input type="text" placeholder="Product name goes here" />
      <label>Description</label>
      <textarea placeholder="Description goes here"></textarea>
      <label>Price (in USD)</label>
      <input type="number" placeholder="Price goes here"></input>
      <button className="btn-primary">Save</button>
    </Layout>
  );
}

export default NewProduct;
