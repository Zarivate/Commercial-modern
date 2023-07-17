import Layout from "@/components/Layout";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
  const [editSession, setEditSession] = useState(null);

  // Variable to hold user input for new category name, if there is one
  const [name, setName] = useState("");

  // Variable to hold the value of the parent category
  const [parentCategory, setParentCategory] = useState("");

  // Variable to hold all the categories
  const [categories, setCategories] = useState([]);

  // UseEffect to grab all the categories at the start
  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to retrieve all the categories, will be called whenever a new one is added and such
  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }

  // Function that saves any new category or user edited info
  async function saveInfo(e) {
    const data = { name, parentCategory };
    e.preventDefault();

    // If there is currently an edit going on
    if (editSession) {
      data._id = editSession._id;
      // Then just make a PUT request to edit the info while passing in the data alongside the id of the category being edited
      await axios.put("/api/categories", data);
      setEditSession(null);
    } else {
      // Else make a post request to make a new category
      await axios.post("/api/categories", data);
    }

    setName("");
    setParentCategory("");
    fetchCategories();
  }

  // Function to edit the category using the entire category object
  function editCategory(category) {
    setEditSession(category);
    setName(category.name);
    // Because parent can be an object, have to check for the id to be properly set
    setParentCategory(category.parent?._id);
  }

  // Function to handle deleting a category, uses entire category object just as before although now with a sweet alert for confirmation
  function deleteCategory(category) {
    // Ask if the user is sure they want to delete the category
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete.",
        confirmButtonColor: "#d55",
        reverseButtons: true,
        icon: "warning",
      })
      // If so then make a request to delete it from the backend
      .then(async (result) => {
        // Check if the isConfirmed property is true, if so means user clicked on confirmation button
        if (result.isConfirmed) {
          // Grab the id from category
          const { _id } = category;
          // Because _id has no body, instead pass it through the url request
          await axios.delete("/api/categories?_id=" + _id);
          fetchCategories();
        }
      });
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editSession
          ? `Edit category ${editSession.name}`
          : "Create new category"}
      </label>
      <form onSubmit={saveInfo} className="flex gap-1">
        <input
          className="mb-0"
          type="text"
          placeholder={"Example name"}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        {/* This is so a user can select a parent element for their category to make it a sub category */}
        <select
          className="mb-0"
          onChange={(e) => setParentCategory(e.target.value)}
          value={parentCategory}
        >
          <option value="">No parent category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option value={category._id}>{category.name}</option>
            ))}
        </select>
        <button type="submit" className="btn-primary py-1">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category Name</td>
            <td>Parent</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length &&
            categories.map((category) => (
              <tr>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td>
                  <button
                    onClick={() => editCategory(category)}
                    className="btn-primary mr-1"
                  >
                    Edit
                  </button>
                  <button
                    className="btn-primary"
                    onClick={() => deleteCategory(category)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
