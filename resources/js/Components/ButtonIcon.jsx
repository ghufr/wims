import React from "react";
import classNames from "classnames";

export default function ButtonIcon({ children, className = "", ...props }) {
  return (
    <button
      className={classNames(
        "px-2 py-2 font-medium transition-colors ease-in-out text-gray-900 hover:bg-gray-300 bg-gray-200 rounded-lg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
