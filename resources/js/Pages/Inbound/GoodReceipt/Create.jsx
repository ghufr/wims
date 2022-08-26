import React, { useState } from "react";

import Input from "@/Components/Input";
import InputLookup from "@/Components/InputLookup";
import Button from "@/Components/Button";
import Label from "@/Components/Label";

export default function ReceivePage() {
  const [items, setItems] = useState([]);

  // const history = useHistory();

  const onAddItem = () => {
    const lastItem = items[items.length - 1];
    const isLastValid = lastItem && lastItem.name;
    const isFirstTime = items.length === 0;

    // Only add new item if previous item is valid or first time input
    if (isLastValid || isFirstTime) {
      setItems([
        ...items,
        { selected: false, sku: "", name: "", quantity: 1, netWeight: 0 },
      ]);
    }
  };

  const onRemoveItem = () => {
    const filteredItems = items.filter((item) => !item.selected);
    setItems(filteredItems);
  };

  const onSubmit = () => {
    // history.replace('/dashboard/operations/inbound')
  };

  const updateItems = (index, newItem) => {
    setItems([...items.slice(0, index), newItem, ...items.slice(index + 1)]);
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Create New Receipt</h2>

      <div className="bg-white rounded-lg p-6">
        <div className="mb-4">
          <div className="grid grid-cols-10 items-center mb-4">
            <Label>Inb. Delivery No</Label>
            <InputLookup type="text" name="supplier" id="supplier" />
          </div>
          <div className="grid grid-cols-10 items-center mb-4">
            <Label forInput="customer">Client ID</Label>
            <InputLookup type="text" name="customer" id="customer" />
          </div>

          <div className="grid grid-cols-10 items-center mb-4">
            <Label forInput="supplier">Supplier ID</Label>
            <InputLookup type="text" name="supplier" id="supplier" />
          </div>

          <div className="grid grid-cols-10 items-center mb-6">
            <Label forInput="deliveryDate">Inb. Delivery Date</Label>
            <Input
              className="rounded-md col-span-2 py-2 px-3 border border-gray-300"
              type="date"
              name="deliveryDate"
              id="deliveryDate"
            />
          </div>

          <hr className="mb-4" />

          <h4 className="font-medium text-lg mb-2">Products List</h4>
          <div className="flex space-x-4">
            <Button onClick={onAddItem}>Add</Button>
            <Button onClick={onRemoveItem}>Remove</Button>
          </div>

          <table className="text-left table-auto w-full">
            <thead className="font-semibold uppercase text-gray-400">
              <tr className="bg-gray-50">
                <th className="p-2">No</th>
                <th className="p-2">SKU</th>
                <th className="p-2">Name</th>
                <th className="p-2">Quantity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {items.map((item, i) => (
                <tr key={i}>
                  <td className="p-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`no-${i}`}
                        className="w-5 h-5"
                        checked={item.selected}
                        name={`${i}`}
                        onChange={(e) => {
                          const { checked } = e.target;
                          updateItems(i, { ...item, selected: checked });
                        }}
                      />
                      <label htmlFor={`no-${i}`} className="ml-2">
                        {i + 1}
                      </label>
                    </div>
                  </td>
                  <td className="p-2 w-12">
                    <InputLookup
                      endpoint="/products"
                      fieldName="sku"
                      name="Product"
                      onFinish={() => updateItems(i, item)}
                    />
                  </td>
                  <td className="p-2">{item.name || "-"}</td>
                  <td className="p-2">
                    <input type="number" min={1}></input>
                  </td>
                  <td className="p-2">{item.netWeight || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <Button
            outline
            type="button"
            // disabled={processing}
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button className="px-3 py-2 bg-gray-200 font-medium rounded-md">
            Create Receipt
          </Button>
        </div>
      </div>
    </div>
  );
}
