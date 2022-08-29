import React from "react";
import Authenticated from "@/Layouts/Authenticated";

import { Link } from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import Table from "@/Components/Table";
import useSelect from "@/Hooks/useSelect";
import useDelete from "@/Hooks/useDelete";

const LocationIndex = ({ locations }) => {
  const { select, setSelect, isSelected, onSelectChange } = useSelect([]);
  // console.log(locations);
  const columns = [
    {
      name: "Name",
      selector: "name",
    },
    {
      name: "Type",
      selector: "type",
    },
    {
      name: "Warehouse",
      selector: "warehouse",
      format: (warehouse) => warehouse.name,
    },
    {
      name: "Section",
      selector: "section",
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

  const { handleDelete, handleMassDelete } = useDelete(
    "master.locations.destroy"
  );

  return (
    <div>
      <div className="mb-4">
        <div className="flex space-x-3 items-center text-gray-500">
          <Link href={route("master.locations.create")}>
            <Button>Create Location</Button>
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
        data={locations}
        selectableRows
        onSelectedRowsChange={(item) => onSelectChange(item.id)}
        onSelectAll={setSelect}
        selectedRows={select}
        rowEdit={(row) => route("master.locations.show", { id: row.id })}
        rowDelete={(row) => handleDelete(row.id)}
      />
    </div>
  );
};

LocationIndex.layout = (page) => (
  <Authenticated title="Locations">{page}</Authenticated>
);

export default LocationIndex;
