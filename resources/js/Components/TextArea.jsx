import React from "react";

function TextArea({ onChange, value, name, id, className, ...props }) {
  return (
    <textarea
      onChange={onChange}
      value={value}
      name={name}
      id={id}
      className={`border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ${
        className || ""
      }`}
      {...props}
    ></textarea>
  );
}

export default TextArea;
