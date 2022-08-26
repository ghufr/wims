import React, { useEffect } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import Button from "./Button";
import Input from "./Input";
import ButtonIcon from "./ButtonIcon";
import axios from "axios";
import Checkbox from "./Checkbox";

export default function InputLookup({
  resource,
  name,
  id,
  endpoint,
  value = "",
  onFinish,
  onChange,
}) {
  const [_value, setValue] = useState({});
  const [list, setList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && endpoint) {
      // axios
      //   .get("/sanctum/csrf-cookie", { withCredentials: true })
      //   .then((res) => {
      //     console.log(res.data);
      //   });

      const token = window.localStorage.getItem("uhuyy");
      if (!token) return;

      axios
        .get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setList(res.data);
        })
        .catch((err) => {});
    }
  }, [isOpen]);

  function onEnter(e) {
    if (e.key === "Enter") {
      // Check if input valid
      e.preventDefault();
    }
  }

  function handleSubmit() {
    setIsOpen(false);
    onFinish && onFinish(_value);
    setValue({});
  }

  return (
    <div className="w-full">
      <div className="relative">
        <Input
          name={name}
          id={id}
          type="text"
          onChange={onChange}
          onKeyDown={onEnter}
          value={value}
          uppercase
        />
        <ButtonIcon
          type="button"
          onClick={() => setIsOpen(true)}
          className="absolute right-2.5 bottom-1"
          tabIndex={-1}
        >
          <HiOutlineSearch />
        </ButtonIcon>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-150"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-4"
                  >
                    Select {resource}
                  </Dialog.Title>
                  <div className="mt-2">
                    <table className="table-auto w-full mb-4">
                      <thead className="bg-gray-200">
                        <tr>
                          <th></th>
                          <th className="p-2">Name</th>
                          <th className="p-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((item, i) => (
                          <tr
                            key={i}
                            className="hover:bg-gray-100 cursor-pointer"
                            onClick={() => setValue({ ...item, index: i })}
                          >
                            <td className="text-center">
                              <Checkbox
                                checked={_value && _value.index === i}
                                // onChange={() => setValue({ ...item, index: i })}
                              />
                            </td>
                            <td className="p-2">{item.name}</td>
                            <td className="p-2">{item.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button outline onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="button" onClick={handleSubmit}>
                      Apply
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
