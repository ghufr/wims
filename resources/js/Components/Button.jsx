import React from "react";
import classNames from "classnames";

const styles = {
  base: "enabled:cursor-pointer px-4 py-2 border rounded-md font-semibold text-xs uppercase tracking-widest transition ease-in-out duration-150",
  primary:
    "bg-gray-900 text-white border-transparent enabled:hover:bg-gray-500 active:bg-gray-500",
  outline:
    "bg-white text-gray-900 border-gray-900 hover:bg-gray-900 active:bg-gray-900 hover:text-white",
  disabled: "opacity-25",
};

export default function Button({
  type = "button",
  className = "",
  disabled = false,
  children,
  onClick,
  color = "primary",
  outline = false,
}) {
  return (
    <button
      type={type}
      className={classNames(
        styles.base,
        {
          [styles[color]]: !outline,
          [styles.outline]: outline,
          [styles.disabled]: disabled,
        },
        className
      )}
      disabled={disabled}
      onClick={onClick || function () {}}
    >
      {children}
    </button>
  );
}
