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

  // Variable to hold any possible properties
  const [properties, setProperties] = useState([]);

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
    e.preventDefault();
    const data = {
      name,
      parentCategory,
      // To simplify things, the properties data is broken down where for each property an object is returned consisting
      // of of the name alongside it's corresponding values. This will result in an array of objects being sent over
      properties: properties.map((property) => ({
        name: property.name,
        values: property.values.split(","),
      })),
    };

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
    setProperties([]);
    fetchCategories();
  }

  // Function to edit the category using the entire category object
  function editCategory(category) {
    setEditSession(category);
    setName(category.name);
    // Because parent can be an object, have to check for the id to be properly set
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
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

  // Function to handle any addition of properties to a category
  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }

  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((property, propertyIndex) => {
        return propertyIndex !== indexToRemove;
      });
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
      <form onSubmit={saveInfo}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder={"Example name"}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {/* This is so a user can select a parent element for their category to make it a sub category */}
          <select
            onChange={(e) => setParentCategory(e.target.value)}
            value={parentCategory}
          >
            <option value="">No parent category</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option value={category._id}>{category.name}</option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            type="button"
            onClick={addProperty}
            className="btn-default text-sm mb-2"
          >
            Add new property
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div className="flex gap-1 mb-2">
                <input
                  type="text"
                  value={property.name}
                  className="mb-0"
                  placeholder="property name"
                  onChange={(e) =>
                    handlePropertyNameChange(index, property, e.target.value)
                  }
                />
                <input
                  type="text"
                  value={property.values}
                  className="mb-0"
                  placeholder="example, example 2, example 3, etc"
                  onChange={(e) =>
                    handlePropertyValuesChange(index, property, e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeProperty(index)}
                  className="btn-default"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <div className="flex gap-1">
          {/* If there is an edit session going on, display the cancel and save button. By now the table should be hidden and the two
          buttons will act as either  */}
          {editSession && (
            <button
              type="button"
              // If they choose to cancel, then the edit session state will be set to false, causing the table to reappear and the name and
              // parent category values will be reset to empty
              onClick={() => {
                setEditSession(null);
                setName("");
                setParentCategory("");
                setProperties([]);
              }}
              className="btn-default"
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn-primary py-1">
            Save
          </button>
        </div>
      </form>
      {/* Checks to see if an active edit session is going on, if so then will hide the table so user can focus on current category being edited.
          Else if there is no active edit session, will display entire table */}
      {!editSession && (
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
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
