import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Label from "@/Components/Label";
import { useForm } from "@inertiajs/inertia-react";
import InputError from "@/Components/InputError";
import TextArea from "@/Components/TextArea";
import Select from "@/Components/Select";

const ProductCreate = ({ product = {} }) => {
  const { data, setData, post, put, processing, errors } = useForm({
    name: product.name || "",
    description: product.description || "",
    baseEan: product.baseEan || "",
    baseUom: product.baseUom || "Kg",
    section: product.section || "FAST",
    type: product.type || "Frozen",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData(name, value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (product.id) {
      put(route("master.products.update", { id: product.id }));
    } else {
      post(route("master.products.store"));
    }
  }

  return (
    <div className="px-4 py-6 bg-white rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="w-full">
            <div className="flex justify-between items-start mb-3">
              <div className="w-full">
                <Label forInput="name" value="Name"></Label>
                <InputError message={errors.name} />
              </div>
              <Input
                className="w-full"
                onChange={handleChange}
                value={data.name}
                type="text"
                name="name"
                id="name"
                required
                uppercase
                noSpace
              />
            </div>

            <div className="flex justify-between items-start mb-3">
              <div className="w-full">
                <Label forInput="description" value="Description"></Label>
                <InputError message={errors.description} />
              </div>
              <TextArea
                className="w-full"
                onChange={handleChange}
                value={data.description}
                name="description"
                id="description"
                rows="2"
              ></TextArea>
            </div>

            <div className="flex justify-between items-start mb-3">
              <div className="w-full">
                <Label forInput="baseEan" value="Base EAN"></Label>
                <InputError message={errors.baseEan} />
              </div>
              <Input
                className="w-full"
                onChange={handleChange}
                value={data.baseEan}
                type="text"
                name="baseEan"
                id="baseEan"
              />
            </div>

            <div className="flex justify-between items-start mb-3">
              <div className="w-full">
                <Label forInput="baseUom" value="Base UOM" />
                <InputError message={errors.baseUom} />
              </div>
              <Select
                onChange={handleChange}
                value={data.baseUom}
                name="baseUom"
                id="baseUom"
                required
                options={[
                  { value: "Kg", label: "Kg" },
                  { value: "Lt", label: "Liter" },
                  { value: "Pcs", label: "Pcs" },
                ]}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-between items-start mb-3">
              <div className="w-full">
                <Label forInput="section" value="Section" />
                <InputError message={errors.section} />
              </div>
              <Select
                className="w-full"
                onChange={handleChange}
                value={data.section}
                name="section"
                id="section"
                required
                options={[
                  { value: "FAST", label: "FAST" },
                  { value: "SLOW", label: "SLOW" },
                ]}
              />
            </div>

            <div className="flex justify-between items-start">
              <div className="w-full">
                <Label forInput="type" value="Type" />
                <InputError message={errors.type} />
              </div>
              <Select
                className="w-full"
                onChange={handleChange}
                value={data.type}
                name="type"
                id="type"
                required
                options={[{ value: "Frozen", label: "Frozen" }]}
              ></Select>
            </div>
          </div>
        </div>
        <div className="justify-end space-x-2 flex">
          <Button
            outline
            type="button"
            disabled={processing}
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={processing}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

ProductCreate.layout = (page) => (
  <Authenticated
    title="Products"
    description={page.props.product ? "Product Details" : "Create new Product"}
    user={page.props.auth.user}
  >
    {page}
  </Authenticated>
);

export default ProductCreate;
