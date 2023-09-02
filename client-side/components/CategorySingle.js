import React, { useState, useEffect } from "react";
import Select from "react-select";

// This file will just handle the individual appearance of each displayed category of product
function CategorySingle({ _id, name, parent, properties }) {
  const [filterProperty, setFilterProperty] = useState("");

  return (
    <>
      {/* <div>{_id}</div>
      <div>{name}</div>
      <div>{parent}</div>
      {properties.map((property) => (
        <>
          <div>{property.values}</div>
        </>
      ))} */}
    </>
  );
}

export default CategorySingle;
