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
  images: exisitingImages,
}) {
  // Router to be used to redirect page
  const router = useRouter();

  // States to hold the user input field values
  const [title, setTitle] = useState(currentTitle || "");
  const [description, setDescription] = useState(currentDescription || "");
  const [price, setPrice] = useState(currentPrice || "");

  // State to hold images for the product
  const [images, setImages] = useState(exisitingImages || []);

  // State to determine whether to return to the product page or not
  const [returnToProducts, setReturnToProducts] = useState(false);

  // Function that sends API request to make the product from the user input fields
  async function saveProduct(e) {
    // Prevent page from reloading
    e.preventDefault();
    const data = { title, description, price, images };

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

  async function uploadImages(e) {
    e.preventDefault();

    // Get the upload files stored within the event
    const files = e.target?.files;

    // If the files' length is greater than 0, that means a file does exist
    if (files?.length > 0) {
      // The files will be sent as FormData as opposed to JSON so parser in backend can be easier
      const data = new FormData();

      // For each file, append it's information to the data object
      for (const file of files) {
        data.append("file", file);
      }

      // Send post request to upload the files. Product won't be updated, instead will simply be uploading images.
      const res = await axios.post("/api/upload", data);

      // Set the images to be whatever existing images are already there and any new links in the response
      setImages((oldImages) => {
        // Return a new array of all pre-existing images alongside any new links found
        return [...oldImages, ...res.data.links];
      });
      console.log(res.data);
    }
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
      <div className="mb-2 flex flex-wrap gap-2">
        {!!images?.length &&
          images.map((link) => (
            <div key={link} className="h-24">
              <img src={link} alt="" className="rounded-lg" />
            </div>
          ))}
        <label
          className="w-24 h-24 rounded-lg flex-col border text-center 
        flex 
        items-center 
        justify-center 
        text-lg 
        gap-1 
        text-gray-900 
        bg-gray-400 
        cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              stroke-linejoin="round"
              d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
            />
          </svg>
          Upload
          <input type="file" className="hidden" onChange={uploadImages} />
        </label>
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
