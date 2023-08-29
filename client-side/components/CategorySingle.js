import React, { useState } from "react";

function CategorySingle({ _id, name, parent, properties }) {
  const [filterProperty, setFilterProperty] = useState("");

  return (
    <>
      <div>{_id}</div>
      <div>{name}</div>
      <div>{parent}</div>
      {properties.map((property) => (
        <>
          <select key={_id}>{property.name}</select>
          <select key={_id}>{property.values}</select>

          <div>{property.values}</div>
        </>
      ))}
    </>
  );
}

export default CategorySingle;
