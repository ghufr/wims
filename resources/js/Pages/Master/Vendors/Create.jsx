import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Label from "@/Components/Label";
import { useForm } from "@inertiajs/inertia-react";
import InputError from "@/Components/InputError";
import TextArea from "@/Components/TextArea";

const VendorCreate = ({ vendor = {} }) => {
  const defaultValues = {
    name: vendor.name || "",
    description: vendor.description || "",
    address: vendor.address || "",
    address2: vendor.address2 || "",
    city: vendor.city || "",
    postalCode: vendor.postalCode || "",
    phone: vendor.phone || "",
  };

  const { data, setData, post, put, processing, errors } =
    useForm(defaultValues);

  function handleChange(e) {
    const { name, value } = e.target;
    setData(name, value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (vendor.id) {
      put(route("master.vendors.update", { id: vendor.id }));
    } else {
      post(route("master.vendors.store"));
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
              <Input
                className="w-full"
                onChange={handleChange}
                value={data.description}
                name="description"
                id="description"
                rows="2"
              ></Input>
            </div>

            <div className="flex justify-between items-start mb-3">
              <div className="w-full">
                <Label forInput="address" value="1st Address"></Label>
                <InputError message={errors.address} />
              </div>
              <TextArea
                className="w-full"
                onChange={handleChange}
                value={data.address}
                type="text"
                name="address"
                id="address"
              />
            </div>

            <div className="flex justify-between items-start mb-3">
              <div className="w-full">
                <Label forInput="address2" value="2nd Address" />
                <InputError message={errors.address2} />
              </div>
              <TextArea
                className="w-full"
                onChange={handleChange}
                value={data.address2}
                type="text"
                name="address2"
                id="address2"
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-between items-start mb-3">
              <div className="w-full">
                <Label forInput="city" value="City" />
                <InputError message={errors.city} />
              </div>
              <Input
                className="w-full"
                onChange={handleChange}
                value={data.city}
                name="city"
                id="city"
                rows="2"
              ></Input>
            </div>

            <div className="flex justify-between items-start mb-3">
              <div className="w-full">
                <Label forInput="postalCode" value="Postal Code" />
                <InputError message={errors.postalCode} />
              </div>
              <Input
                className="w-full"
                onChange={handleChange}
                value={data.postalCode}
                name="postalCode"
                id="postalCode"
                type="number"
                min={0}
              ></Input>
            </div>

            <div className="flex justify-between items-start">
              <div className="w-full">
                <Label forInput="phone" value="Phone" />
                <InputError message={errors.phone} />
              </div>
              <Input
                className="w-full"
                onChange={handleChange}
                value={data.phone}
                name="phone"
                id="phone"
                rows="2"
              ></Input>
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

VendorCreate.layout = (page) => (
  <Authenticated
    title="Vendor"
    description={page.props.vendor ? "Vendor Details" : "Create new Vendor"}
    user={page.props.auth.user}
  >
    {page}
  </Authenticated>
);

export default VendorCreate;
