import React, { useEffect, useRef } from "react";

import classNames from "classnames";

const styles = {
  base: "w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm",
  disabled: "bg-gray-200",
};

export default function Input({
  type = "text",
  name,
  value,
  className = "",
  autoComplete,
  required,
  isFocused,
  onChange,
  uppercase = false,
  noSpace = false,
  placeholder = "",
  readOnly = false,
  disabled = false,
  ...props
}) {
  const input = useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  function handleChange(e) {
    let modifiedE = e;

    if (noSpace) {
      modifiedE.target.value = e.target.value.replace(" ", "");
    }
    if (uppercase) {
      modifiedE.target.value = e.target.value.toLocaleUpperCase();
    }
    // console.log(modifiedE.target.value);
    onChange && onChange(modifiedE);
  }

  return (
    <input
      type={type}
      name={name}
      value={value}
      className={classNames(
        {
          [styles.base]: true,
          [styles.disabled]: disabled || readOnly,
        },
        className
      )}
      ref={input}
      autoComplete={autoComplete}
      required={required}
      onChange={handleChange}
      placeholder={placeholder}
      readOnly={readOnly}
      disabled={disabled}
      {...props}
    />
  );
}
