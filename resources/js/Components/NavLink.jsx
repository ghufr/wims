import React from "react";
import { Link } from "@inertiajs/inertia-react";
import classNames from "classnames";

const classes = {
  base: "flex items-center p-2 font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-all",
  active: "bg-gray-100 text-gray-900",
};

export default function NavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className={classNames({
        [classes.base]: true,
        [classes.active]: active,
      })}
    >
      {children}
    </Link>
  );
}
