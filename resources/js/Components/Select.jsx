import React from "react";

function Select({
  name,
  id,
  value,
  onChange,
  className,
  options = [],
  required = false,
}) {
  return (
    <select
      className={`border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ${
        className || ""
      }`}
      name={name}
      id={id}
      onChange={onChange}
      value={value}
      required={required}
    >
      {options.map((item, i) => (
        <option key={i} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
