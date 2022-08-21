import React from "react";
import Authenticated from "@/Layouts/Authenticated";

import { Link } from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import { Inertia } from "@inertiajs/inertia";
import Table from "@/Components/Table";
import useSelect from "@/Hooks/useSelect";

const ProductIndex = ({ products }) => {
  const { select, isSelected, onSelectChange } = useSelect([]);
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

  function handleDelete(id) {
    Inertia.delete(route("master.products.destroy", { id }));
  }

  function handleMassDelete(ids = []) {
    if (ids.length === 0) return;
    Inertia.delete(route("master.products.destroy", { id: ids.join(",") }));
  }

  return (
    <div>
      <div className="mb-4">
        <div className="flex space-x-3 items-center text-gray-500">
          <Link href={route("master.products.create")}>
            <Button>Create Product</Button>
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
        data={products}
        selectableRows
        onSelectedRowsChange={(item) => onSelectChange(item.id)}
        rowEdit={(row) => route("master.products.show", { id: row.id })}
        rowDelete={(row) => handleDelete(row.id)}
      />
    </div>
  );
};

ProductIndex.layout = (page) => (
  <Authenticated user={page.props.auth.user} title="Products">
    {page}
  </Authenticated>
);

export default ProductIndex;
