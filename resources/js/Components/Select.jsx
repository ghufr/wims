import React from "react";
import classNames from "classnames";

const styles = {
  base: "appearance-none border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm",
  disabled: "bg-gray-200",
};

function Select({
  name,
  id,
  value,
  onChange,
  className,
  options = [],
  required = false,
  disabled = false,
}) {
  return (
    <select
      className={classNames(
        {
          [styles.base]: true,
          [styles.disabled]: disabled,
        },
        className
      )}
      name={name}
      id={id}
      onChange={onChange}
      value={value}
      required={required}
      disabled={disabled}
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
