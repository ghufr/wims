import React from "react";

export default function Checkbox({ id, name, value, onChange, checked }) {
  return (
    <input
      type="checkbox"
      id={id}
      name={name}
      value={value}
      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      onChange={(e) => onChange && onChange(e)}
      checked={checked}
    />
  );
}
