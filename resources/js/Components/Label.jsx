import React from "react";

import classNames from "classnames";

export default function Label({ forInput, value, className, children }) {
  return (
    <label
      htmlFor={forInput}
      className={classNames(
        "block font-medium text-sm text-gray-700",
        className
      )}
    >
      {value ? value : children}
    </label>
  );
}
