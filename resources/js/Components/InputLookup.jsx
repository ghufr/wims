import React from "react";

import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import Button from "./Button";
import Input from "./Input";
import ButtonIcon from "./ButtonIcon";
import axios from "axios";
import Checkbox from "./Checkbox";
import { useQuery } from "@tanstack/react-query";
import Modal from "./Modal";
import { makeRequest } from "@/Utils/request";

export default function InputLookup({
  resource,
  name,
  id,
  endpoint,
  value = "",
  onFinish,
  onChange,
  disabled = false,
  required = false,
}) {
  const [_value, setValue] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const { error, data } = useQuery(
    [endpoint],
    () => makeRequest((options) => axios.get(endpoint, options)),
    { enabled: isOpen, initialData: [] }
  );

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
          disabled={disabled}
          uppercase
          required={required}
        />
        {!disabled && (
          <ButtonIcon
            type="button"
            onClick={() => setIsOpen(true)}
            className="absolute right-2.5 bottom-1"
            tabIndex={-1}
          >
            <HiOutlineSearch />
          </ButtonIcon>
        )}
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`Select ${resource}`}
      >
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
              {error && <p>{error.message}</p>}

              {data.map((item, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => setValue({ ...item, index: i })}
                >
                  <td className="text-center">
                    <Checkbox checked={_value && _value.index === i} />
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
      </Modal>
    </div>
  );
}
