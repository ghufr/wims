import React from "react";
import Authenticated from "@/Layouts/Authenticated";

import { Link } from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import Table from "@/Components/Table";
import useSelect from "@/Hooks/useSelect";
import useDelete from "@/Hooks/useDelete";

const UserIndex = ({ users }) => {
  const { select, isSelected, onSelectChange, setSelect } = useSelect([]);
  const columns = [
    {
      name: "Name",
      selector: "name",
    },
    {
      name: "Email",
      selector: "email",
    },
    {
      name: "Role",
      selector: "roles",
      format: (roles) =>
        roles.map((role) => <span key={role.name}>{role.name}</span>),
    },
    {
      name: "Updated At",
      selector: "updated_at",
      format: (column) =>
        new Date(column).toLocaleDateString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
  ];

  const { handleDelete, handleMassDelete } = useDelete("master.users.destroy");

  return (
    <div>
      <div className="mb-4">
        <div className="flex space-x-3 items-center text-gray-500">
          <Link href={route("master.users.create")}>
            <Button>Create User</Button>
          </Link>
          {isSelected && (
            <Button outline onClick={() => handleMassDelete(select)}>
              Delete Selected ({select.length})
            </Button>
          )}
        </div>
      </div>

      <Table
        columns={columns}
        data={users}
        selectableRows
        onSelectedRowsChange={(item) => onSelectChange(item.id)}
        onSelectAll={setSelect}
        selectedRows={select}
        rowEdit={(row) => route("master.users.show", { id: row.id })}
        rowDelete={(row) => handleDelete(row.id)}
      />
    </div>
  );
};

UserIndex.layout = (page) => (
  <Authenticated title="Users">{page}</Authenticated>
);

export default UserIndex;
