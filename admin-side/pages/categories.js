import Layout from "@/components/Layout";
import React from "react";

function categories() {
  return (
    <Layout>
      <h1>Categories</h1>
      <label>New Category Name</label>
      <form onSubmit={console.log("yes")} className="flex gap-1">
        <input className="mb-0" type="text" />
      </form>
    </Layout>
  );
}

export default categories;
