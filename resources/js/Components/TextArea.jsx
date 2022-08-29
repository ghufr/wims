import React from "react";
import classNames from "classnames";

const styles = {
  base: "w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm",
  disabled: "bg-gray-200",
};

function TextArea({
  onChange,
  value = "",
  name,
  id,
  disabled,
  className,
  rows = 2,
  ...props
}) {
  return (
    <textarea
      onChange={onChange && onChange}
      value={value}
      name={name}
      rows={rows}
      id={id}
      className={classNames(
        {
          [styles.base]: true,
          [styles.disabled]: disabled,
        },
        className
      )}
      disabled={disabled}
      {...props}
    ></textarea>
  );
}

export default TextArea;
