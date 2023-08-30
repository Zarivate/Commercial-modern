import React, { useState } from "react";
import Select from "react-select";

function CategorySingle({ _id, name, parent, properties }) {
  const [filterProperty, setFilterProperty] = useState("");

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <>
      <div>{_id}</div>
      <div>{name}</div>
      <div>{parent}</div>
      {properties.map((property) => (
        <>
          <Select options={options} />

          <div>{property.values}</div>
        </>
      ))}
    </>
  );
}

export default CategorySingle;
