import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

// This file handles the form used to create new products
function ProductForm({
  // The id is special in that it'll determine what kind of axios request is made. As it will be undefined
  // if the form is accessed when creating a new product, as opposed to when it's editing a product.
  _id,
  title: currentTitle,
  description: currentDescription,
  price: currentPrice,
  images,
}) {
  // Router to be used to redirect page
  const router = useRouter();

  // States to hold the user input field values
  const [title, setTitle] = useState(currentTitle || "");
  const [description, setDescription] = useState(currentDescription || "");
  const [price, setPrice] = useState(currentPrice || "");

  // State to determine whether to return to the product page or not
  const [returnToProducts, setReturnToProducts] = useState(false);

  // Function that sends API request to make the product from the user input fields
  async function saveProduct(e) {
    // Prevent page from reloading
    e.preventDefault();
    const data = { title, description, price };

    // If there is a product id, then it should make a request to update the product
    if (_id) {
      // Send put request to update the product info. Will pass in a new object containing
      // the already exisiting data alongside the id
      await axios.put("/api/products", { ...data, _id });
    } else {
      // Make request to create the product

      await axios.post("/api/products", data);
    }
    // Once an admin has submitted a product to the backend, set that you'll want to return to the products page
    setReturnToProducts(true);
  }

  // If the variable is true, then will want to push the products page to the top to display it
  if (returnToProducts) {
    router.push("/products");
  }

  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="Product name goes here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Photos</label>
      <div className="mb-2">
        {!images?.length && <div>This product has no images</div>}
      </div>
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
  );
}

export default ProductForm;
