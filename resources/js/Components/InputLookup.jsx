import React from "react";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import Button from "./Button";
import Input from "./Input";

export default function InputLookup({ resource, name }) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="relative">
        <Input
          name={name}
          type="text"
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded bg-gray-300 p-2 absolute right-2.5 bottom-1"
          tabIndex={-1}
        >
          <HiOutlineSearch />
        </Button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Select {resource}
                  </Dialog.Title>
                  <div className="mt-2">
                    <table className="table-auto w-full">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="p-2">{resource} Name</th>
                          <th className="p-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2">001</td>
                          <td className="p-2">Dori Fillet</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button outline>Cancel</Button>
                    <Button type="button" onClick={() => setIsOpen(false)}>
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
