import React from "react";

export default function ButtonIcon({ children, ...props }) {
  return (
    <button
      className="px-2 py-2 font-medium transition-colors ease-in-out text-gray-500 hover:bg-gray-300 bg-gray-200 rounded-lg"
      {...props}
    >
      {children}
    </button>
  );
}
