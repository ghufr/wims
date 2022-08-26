import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Label from "@/Components/Label";
import { useForm } from "@inertiajs/inertia-react";
import InputError from "@/Components/InputError";
import Select from "@/Components/Select";

const LocationCreate = ({ location = {} }) => {
  const { data, setData, post, put, processing, errors } = useForm({
    name: location.name || "",
    type: location.type || "REG",
    warehouse_id: location.warehouse_id || "",
    section: location.section || "FAST",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData(name, value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (location.id) {
      put(route("master.locations.update", { id: location.id }));
    } else {
      post(route("master.locations.store"));
    }
  }

  return (
    <div className="px-4 py-6 bg-white rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="w-full">
            <div className="flex justify-between items-start mb-3">
              <div className="w-1/2">
                <Label forInput="name" value="Name"></Label>
                <InputError message={errors.name} />
              </div>
              <Input
                className="w-1/2"
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
              <div className="w-1/2">
                <Label forInput="type" value="Type"></Label>
                <InputError message={errors.type} />
              </div>
              <Select
                className="w-1/2"
                onChange={handleChange}
                value={data.type}
                name="type"
                id="type"
                options={[{ value: "", label: "" }]}
              ></Select>
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-between items-start mb-3">
              <div className="w-1/2">
                <Label forInput="warehouse_id" value="Warehouse ID"></Label>
                <InputError message={errors.warehouse_id} />
              </div>
              <Input
                className="w-1/2"
                onChange={handleChange}
                value={data.warehouse_id}
                type="text"
                name="warehouse_id"
                id="warehouse_id"
              />
            </div>
            <div className="flex justify-between items-start mb-3">
              <div className="w-1/2">
                <Label forInput="section" value="Section" />
                <InputError message={errors.section} />
              </div>
              <Select
                className="w-1/2"
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

LocationCreate.layout = (page) => (
  <Authenticated
    title="Locations"
    description={
      page.props.location ? "Location Details" : "Create new Location"
    }
    user={page.props.auth.user}
  >
    {page}
  </Authenticated>
);

export default LocationCreate;
