// This file will handle adding new products to the site. It will be what appears when an admin clicks the
// "Add new product" button, it will be what appears when the link goes to /products/new
import Layout from "@/components/Layout";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";

function NewProduct() {
  // Router to be used to redirect page
  const router = useRouter();

  // States to hold the user input field values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  // State to determine whether to return to the product page or not
  const [returnToProducts, setReturnToProducts] = useState(false);

  // Function that sends API request to make the product from the user input fields
  async function makeProduct(e) {
    // Prevent page from reloading
    e.preventDefault();
    const data = { title, description, price };

    await axios.post("/api/products", data);

    // Once an admin has submitted a product to the backend, set that you'll want to return to the products page
    setReturnToProducts(true);
  }

  // If the variable is true, then will want to push the products page to the top to display it
  if (returnToProducts) {
    router.push("/products");
  }

  return (
    <Layout>
      <form onSubmit={makeProduct}>
        <h1>New Product</h1>
        <label>Product Name</label>
        <input
          type="text"
          placeholder="Product name goes here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description</label>
        <textarea
          placeholder="Description goes here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Price (in USD)</label>
        <input
          type="number"
          placeholder="Price goes here"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></input>
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </Layout>
  );
}

export default NewProduct;
