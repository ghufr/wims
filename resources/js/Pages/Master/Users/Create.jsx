import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Label from "@/Components/Label";
import { useForm } from "@inertiajs/inertia-react";
import InputError from "@/Components/InputError";
import Select from "@/Components/Select";

const UserCreate = ({ user = {} }) => {
  const { data, setData, post, put, processing, errors } = useForm({
    name: user.name || "",
    description: user.description || "",
    baseEan: user.baseEan || "",
    baseUom: user.baseUom || "Kg",
    section: user.section || "FAST",
    type: user.type || "Frozen",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData(name, value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (user.id) {
      put(route("master.users.update", { id: user.id }));
    } else {
      post(route("master.users.store"));
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
              />
            </div>

            <div className="flex justify-between items-start mb-3">
              <div className="w-full">
                <Label forInput="email" value="Email"></Label>
                <InputError message={errors.email} />
              </div>
              <Input
                className="w-full"
                onChange={handleChange}
                type="email"
                value={data.email}
                name="email"
                id="email"
              ></Input>
            </div>

            <div className="flex justify-between items-start mb-3">
              <div className="w-full">
                <Label forInput="password" value="Password"></Label>
                <InputError message={errors.password} />
              </div>
              <Input
                className="w-full"
                type="password"
                onChange={handleChange}
                value={data.password}
                name="password"
                id="password"
              />
            </div>
            <div className="flex justify-between items-start mb-3">
              <div className="w-full">
                <Label forInput="role" value="Role"></Label>
                <InputError message={errors.role} />
              </div>
              <Select
                className="w-full"
                onChange={handleChange}
                value={data.role}
                name="role"
                id="role"
                required
                options={[
                  { value: "operator", label: "Operator" },
                  { value: "admin", label: "Admin" },
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

UserCreate.layout = (page) => (
  <Authenticated
    title="Users"
    description={page.props.user ? "User Details" : "Create new User"}
    user={page.props.auth.user}
  >
    {page}
  </Authenticated>
);

export default UserCreate;
