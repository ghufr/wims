import React from "react";
import Authenticated from "@/Layouts/Authenticated";

import { Link } from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import Table from "@/Components/Table";
import useSelect from "@/Hooks/useSelect";
import useDelete from "@/Hooks/useDelete";

const ProductIndex = ({ products, can = {} }) => {
  const { select, isSelected, onSelectChange, setSelect } = useSelect([]);
  const columns = [
    {
      name: "Name",
      selector: "name",
    },
    {
      name: "Description",
      selector: "description",
    },
    {
      name: "Base EAN",
      selector: "baseEan",
    },
    {
      name: "Section",
      selector: "section",
    },
    {
      name: "Type",
      selector: "type",
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
    "master.products.destroy"
  );

  return (
    <div>
      <div className="mb-4">
        <div className="flex space-x-3 items-center text-gray-500">
          {can.create_Product && (
            <Link href={route("master.products.create")}>
              <Button>Create Product</Button>
            </Link>
          )}
          {isSelected && (
            <Button outline onClick={() => handleMassDelete(select)}>
              Delete Selected ({select.length})
            </Button>
          )}
        </div>
      </div>

      <Table
        columns={columns}
        data={products}
        selectableRows
        onSelectedRowsChange={(item) => onSelectChange(item.id)}
        onSelectAll={setSelect}
        selectedRows={select}
        rowEdit={(row) => route("master.products.show", { id: row.id })}
        rowDelete={(row) => handleDelete(row.id)}
      />
    </div>
  );
};

ProductIndex.layout = (page) => (
  <Authenticated title="Products">{page}</Authenticated>
);

export default ProductIndex;
