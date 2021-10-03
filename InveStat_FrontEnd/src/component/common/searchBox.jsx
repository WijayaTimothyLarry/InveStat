import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      placeholder="Search..."
      name="query"
      className=" form-control my-3"
    />
  );
};

export default SearchBox;
