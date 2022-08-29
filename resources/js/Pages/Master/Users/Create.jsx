import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Label from "@/Components/Label";
import { useForm } from "@inertiajs/inertia-react";
import InputError from "@/Components/InputError";
// import Select from "@/Components/Select";
import Checkbox from "@/Components/Checkbox";
import Select from "@/Components/Select";
import useSelect from "@/Hooks/useSelect";
import usePermission from "@/Hooks/usePermission";

const methods = ["ViewAll", "View", "Create", "Delete", "Update"];

const UserCreate = ({ userData = {}, permissions = [], roles = [], can }) => {
  const { data, setData, post, put, processing, errors } = useForm({
    name: userData.name || "",
    email: userData.email || "",
    password: userData.password || "",
    role: (userData.roles && userData.roles[0].name) || "",
  });

  const permission = usePermission(can, "User");
  const disabled = userData.id ? !permission.update : !permission.create;

  const { select, onSelectChange } = useSelect([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setData(name, value);
  }

  console.log(userData.roles);

  function handleSubmit(e) {
    e.preventDefault();
    if (userData.id) {
      put(route("master.users.update", { id: userData.id }));
    } else {
      post(route("master.users.store"));
    }
  }

  return (
    <div className="px-4 py-6 bg-white rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="md:w-1/2">
            <div className="flex justify-between items-start mb-3">
              <div className="w-1/2">
                <Label forInput="email" value="Email"></Label>
                <InputError message={errors.email} />
              </div>
              <Input
                className="w-1/2"
                onChange={handleChange}
                type="email"
                value={data.email}
                name="email"
                id="email"
                disabled={userData.id || disabled}
              ></Input>
            </div>
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
                disabled={disabled}
              />
            </div>

            <div className="flex justify-between items-start mb-3">
              <div className="w-1/2">
                <Label forInput="password" value="Password"></Label>
                <InputError message={errors.password} />
              </div>
              <Input
                className="w-1/2"
                type="password"
                onChange={handleChange}
                value={data.password}
                name="password"
                id="password"
                placeholder={userData.id ? "(Unchanged)" : ""}
                disabled={disabled}
              />
            </div>
            <div className="flex justify-between items-start mb-3">
              <div className="w-1/2">
                <Label forInput="role" value="Role"></Label>
                <InputError message={errors.role} />
              </div>
              <Select
                className="w-1/2"
                onChange={handleChange}
                value={data.role}
                name="role"
                id="role"
                required
                options={roles.map(({ name }) => ({
                  value: name,
                  label: name,
                }))}
                disabled={disabled}
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
          <Button type="submit" disabled={processing || disabled}>
            Save
          </Button>
        </div>
        <hr className="my-4" />
        <table className="text-left table-auto w-full">
          <thead>
            <tr>
              <th>
                <p>Model</p>
              </th>
              {methods.map((name) => (
                <th key={name}>
                  <div className="flex items-center space-x-2">
                    <Checkbox value={name} id={name} />
                    <Label forInput={name}>{name}</Label>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(permissions).map((key, i) => {
              const models = permissions[key];
              return (
                <tr key={i}>
                  <td>
                    <div className="flex items-center space-x-2">
                      <Checkbox value={key} id={key} />
                      <Label forInput={key}>{key}</Label>
                    </div>
                  </td>

                  {models.map((item) => (
                    <td className="py-2" key={item.name}>
                      <Checkbox
                        value={item.name}
                        checked={select.indexOf(item.name) > -1}
                        onChange={() => onSelectChange(item.name)}
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </div>
  );
};

UserCreate.layout = (page) => (
  <Authenticated
    title="Users"
    description={page.props.userData ? "User Details" : "Create new User"}
  >
    {page}
  </Authenticated>
);

export default UserCreate;
