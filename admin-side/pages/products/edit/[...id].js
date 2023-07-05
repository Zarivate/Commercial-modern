import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function EditProductPage() {
  // Usestate for storing the products information
  const [productInfo, setProductInfo] = useState(null);

  // Router to get the product information through it's id in the url
  const router = useRouter();

  // Grab the id from the id field within the query field of router.
  // Note: Can't do const id = router.query.id[0], even though gets the id it will break when refreshing unlike
  // with keeping it as an object.
  const { id } = router.query;

  // Useeffect to make a GET request to get the products details
  useEffect(() => {
    // If there is no id present yet, just return
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((res) => {
      setProductInfo(res.data);
    });
  }, [id]);

  return (
    <Layout>
      <h1>Edit Product</h1>
      {/* Send the product info to the ProductForm component to be displayed. Only load form once the data has been loaded. */}
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
}
