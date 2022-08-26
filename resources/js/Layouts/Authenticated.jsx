import { Disclosure } from "@headlessui/react";
import React from "react";
import Button from "@/Components/Button";

import {
  HiOutlineHome,
  HiOutlineArrowSmRight,
  HiChevronDown,
  HiOutlineCog,
  HiOutlineArrowSmLeft,
} from "react-icons/hi";
import { Head, Link } from "@inertiajs/inertia-react";
import NavLink from "@/Components/NavLink";

const renderMenu = (menu) => {
  if (menu.children) {
    return (
      <Disclosure key={menu.name} as={"li"} defaultOpen={false}>
        <Disclosure.Button
          className="w-full flex justify-between items-center py-2 px-2  font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition-all"
          aria-controls="dropdown-example"
          data-collapse-toggle="dropdown-example"
        >
          <menu.icon size={24} className="mr-3 hidden md:block" />
          <span className="flex-1 text-left whitespace-nowrap">
            {menu.name}
          </span>
          <span className="text-right">
            <HiChevronDown />
          </span>
        </Disclosure.Button>

        <Disclosure.Panel
          as="ul"
          className="py-2 absolute bg-white md:relative rounded space-y-1 ml-3"
        >
          {menu.children.map((menu) => renderMenu(menu))}
        </Disclosure.Panel>
      </Disclosure>
    );
  }
  return (
    <li key={menu.name}>
      <NavLink
        href={menu.href && route(menu.href)}
        active={menu.href && route().current(menu.href)}
      >
        {menu.icon && <menu.icon className="mr-3 hidden md:block" size={24} />}
        <span>{menu.name}</span>
      </NavLink>
    </li>
  );
};

export default function Authenticated({
  user,
  title = "",
  description,
  children,
}) {
  const menus = [
    {
      name: "Dashboard",
      href: "dashboard",
      icon: HiOutlineHome,
    },
    {
      name: "Inbound",
      icon: HiOutlineArrowSmRight,
      children: [
        {
          name: "Inbound Delivery",
          href: "inbound.delivery",
        },
        {
          name: "Good Receiving",
          href: "inbound.receipt",
        },
      ],
    },
    {
      name: "Outbound",
      icon: HiOutlineArrowSmLeft,
      children: [
        {
          name: "Outbound Delivery",
          href: "outbound.delivery",
        },
        {
          name: "Delivery Order",
          href: "outbound.order",
        },
      ],
    },
    {
      name: "Master Data",
      icon: HiOutlineCog,
      children: [
        {
          name: "Products",
          href: "master.products.index",
        },
        {
          name: "Warehouses",
          href: "master.warehouses.index",
        },
        {
          name: "Locations",
          href: "master.locations.index",
        },
        {
          name: "Vendors",
          href: "master.vendors.index",
        },
        {
          name: "Customers",
          href: "master.customers.index",
        },
        {
          name: "Users",
          href: "master.users.index",
        },
      ],
    },
  ];

  return (
    <div className="flex h-full min-h-screen flex-row bg-gray-100">
      <Head>
        <title>{title}</title>
      </Head>
      <aside
        className="hidden md:block max-w-xs w-full min-h-screen"
        aria-label="Sidebar"
      >
        <div className="h-full bg-white border-r border-gray-200">
          <div className="relative flex flex-col h-full justify-between">
            <div className="h-full max-h-screen min-h-screen pb-16 overflow-y-auto py-4 px-4">
              <nav>
                <ul className="space-y-1">{menus.map(renderMenu)}</ul>
              </nav>
            </div>
            <div className="absolute bottom-0 w-full flex justify-between items-center bg-gray-50 p-4">
              <p className="font-medium text-sm">{user.name}</p>
              <Link href={route("logout")} method="post" as="div">
                <Button outline>Logout</Button>
              </Link>
            </div>
          </div>
        </div>
      </aside>

      <main className="w-full">
        <nav className="md:hidden bg-gray-200 py-2">
          <ul className="flex space-x-4">{menus.map(renderMenu)}</ul>
        </nav>
        <div className="p-2 md:p-6">
          <div className="mb-4">
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-gray-500 font-medium">{description || " "}</p>
          </div>
          <div>{children}</div>
        </div>
      </main>
    </div>
  );
}
