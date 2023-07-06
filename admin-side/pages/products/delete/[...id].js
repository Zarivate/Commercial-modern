import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";

function DeleteProductPage() {
  const router = useRouter();

  // Variable to hold the product's info
  const [productInfo, setProductInfo] = useState();

  // Get the product id from the url
  const { id } = router.query;

  // Useeffect to retrieve the product data
  useEffect(() => {
    // If there is no id yet, just return
    if (!id) {
      return;
    }
    axios.get(`/api/products?id=${id}`).then((res) => {
      setProductInfo(res.data);
    });
  }, [id]);

  // Function to return to previous products page
  function goBack() {
    router.push("/products");
  }

  // Function to handle deletion of a product
  async function deleteProduct() {
    await axios.delete(`/api/products?id=${id}`);
    goBack();
  }

  return (
    <Layout>
      <h1 className="text-center">
        Are you sure you want to delete product "{productInfo?.title}"?
      </h1>
      <div className="flex gap-2 justify-center">
        <button onClick={deleteProduct} className="btn-red">
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
}

export default DeleteProductPage;
