import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Label from "@/Components/Label";
import { useForm } from "@inertiajs/inertia-react";
// import InputError from "@/Components/InputError";
// import TextArea from "@/Components/TextArea";
import InputLookup from "@/Components/InputLookup";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import useCsrf from "@/Hooks/useCsrf";
import useItems from "@/Hooks/useItems";

const GoodsReceiptCreate = ({ receipt = {}, can = {} }) => {
  useCsrf();
  const defaultValues = {
    inboundNo: receipt.inboundNo || "",
    grNo: receipt.grNo || "",
    grDate: receipt.grDate || "",
    client: (receipt.client && receipt.client.name) || "",
    supplier: (receipt.supplier && receipt.supplier.name) || "",
    products: receipt.products || [{}],
  };

  console.log(receipt);

  const { data, setData, post, put, processing, errors } =
    useForm(defaultValues);

  const { addItem, removeItem, updateItem, selectedCount, items } = useItems(
    defaultValues.products
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setData(name, value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setData("products", items);

    if (receipt.id) {
      put(route("inbound.receipt.update", { id: receipt.id }));
    } else {
      post(route("inbound.receipt.store"));
    }
  }

  return (
    <div className="px-4 py-6 bg-white rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="md:grid lg:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="flex items-start mb-4">
              <div className="w-1/2">
                <Label forInput="inboundNo">Inb. Deliv. No</Label>
                <InputError message={errors.inboundNo} />
              </div>
              <div className="w-full">
                <Input
                  type="text"
                  name="inboundNo"
                  id="inboundNo"
                  value={data.inboundNo}
                  onChange={handleChange}
                  disabled={receipt.id || !can.edit_GoodsReceipt}
                />
              </div>
            </div>
            <div className="flex items-start mb-4">
              <div className="w-1/2">
                <Label forInput="grNo">GR. No</Label>
                <InputError message={errors.grNo} />
              </div>
              <div className="w-full">
                <Input
                  type="text"
                  name="grNo"
                  id="grNo"
                  value={data.grNo}
                  onChange={handleChange}
                  disabled={receipt.id || !can.edit_GoodsReceipt}
                />
              </div>
            </div>
            <div className="flex mb-4">
              <div className="w-1/2">
                <Label forInput="client">Client Name</Label>
                <InputError message={errors.client} />
              </div>
              <InputLookup
                endpoint={route("api.master.vendors.index")}
                name="client"
                id="client"
                resource="Client"
                value={data.client}
                onChange={handleChange}
                onFinish={(val) => setData("client", val.name)}
                disabled={!can.edit_GoodsReceipt}
              />
            </div>
            <div className="flex mb-4">
              <div className="w-1/2">
                <Label forInput="supplier">Supplier Name</Label>
                <InputError message={errors.supplier} />
              </div>
              <InputLookup
                endpoint={route("api.master.vendors.index")}
                name="supplier"
                id="supplier"
                resource="Supplier"
                value={data.supplier}
                onChange={handleChange}
                onFinish={(val) => setData("supplier", val.name)}
                disabled={!can.edit_GoodsReceipt}
              />
            </div>
            <div className="flex mb-4">
              <div className="w-1/2">
                <Label forInput="grDate">GR. Date</Label>
                <InputError message={errors.grDate} />
              </div>
              <div className="w-full">
                <Input
                  type="date"
                  name="grDate"
                  id="grDate"
                  onChange={handleChange}
                  value={data.grDate}
                  disabled={!can.edit_GoodsReceipt}
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="mb-4" />

        <h4 className="font-medium text-lg mb-2">Product List</h4>
        {can.edit_GoodsReceipt && (
          <div className="flex space-x-4 mb-4">
            <Button onClick={addItem}>Add</Button>
            {selectedCount > 0 && (
              <Button onClick={() => removeItem()} outline>
                Remove Selected ({selectedCount})
              </Button>
            )}
          </div>
        )}

        <table className="text-left table-fixed w-full mb-4">
          <thead className="font-semibold uppercase text-gray-400">
            <tr className="bg-gray-50">
              <th className="p-1 w-12">No</th>
              <th className="p-1">Name</th>
              <th className="p-1">Description</th>
              <th className="p-1">Quantity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {items.map((item, i) => (
              <tr key={i}>
                <td className="p-1 w-12">
                  <div className="flex items-center">
                    <label htmlFor={`no-${i}`} className="mr-1">
                      {i + 1}
                    </label>
                    {can.edit_GoodsReceipt && (
                      <Checkbox
                        id={`no-${i}`}
                        checked={item.selected}
                        onChange={(e) => {
                          const { checked } = e.target;
                          // onSelectChange(item.id);
                          updateItem(i, { ...item, selected: checked });
                        }}
                      />
                    )}
                  </div>
                </td>
                <td className="p-1 max-w-[100px]">
                  <InputLookup
                    endpoint={route("api.master.products.index")}
                    name={`products[${i}]`}
                    id={`products[${i}]`}
                    resource="Product"
                    value={item.name}
                    disabled={!can.edit_GoodsReceipt}
                    onChange={(e) =>
                      updateItem(i, { ...item, name: e.target.value })
                    }
                    onFinish={(val) => {
                      // setData(`product[${i}]`, val.name);
                      updateItem(i, {
                        id: val.id,
                        name: val.name,
                        description: val.description,
                        valid: true,
                      });
                      // addItem({});
                    }}
                  />
                </td>
                <td className="p-1">{item.description || "-"}</td>
                <td className="p-1 max-w-[100px]">
                  <Input
                    type="number"
                    min={1}
                    value={item.quantity || 1}
                    disabled={!item.description || !can.edit_GoodsReceipt}
                    onChange={(e) => {
                      updateItem(i, { ...item, quantity: e.target.value });
                    }}
                  ></Input>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="justify-end space-x-2 flex">
          <Button
            outline
            type="button"
            disabled={processing}
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={processing || !can.edit_GoodsReceipt}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

GoodsReceiptCreate.layout = (page) => (
  <Authenticated
    title="Goods Receipts"
    description={
      page.props.receipt ? "Goods Receipt Details" : "Create new Goods Receipt"
    }
    user={page.props.auth.user}
  >
    {page}
  </Authenticated>
);

export default GoodsReceiptCreate;
