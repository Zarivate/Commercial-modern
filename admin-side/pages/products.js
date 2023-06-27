import Layout from "@/components/Layout";
import React from "react";
import Link from "next/link";

function Products() {
  return (
    <Layout>
      <Link
        className="bg-blue-900 text-white py-1 px-2 rounded-lg"
        href={"/products/new"}
      >
        Add new product
      </Link>
    </Layout>
  );
}

export default Products;
