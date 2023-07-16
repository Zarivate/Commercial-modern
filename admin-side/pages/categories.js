import Layout from "@/components/Layout";
import axios from "axios";
import React, { useState } from "react";

export default function Categories() {
  const [name, setName] = useState("");

  async function saveInfo(e) {
    e.preventDefault();
    await axios.post("/api/categories", { name });
    setName("");
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>New category name</label>
      <form onSubmit={saveInfo} className="flex gap-1">
        <input
          className="mb-0"
          type="text"
          placeholder={"Example name"}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button type="submit" className="btn-primary py-1">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category Name</td>
          </tr>
        </thead>
      </table>
    </Layout>
  );
}
