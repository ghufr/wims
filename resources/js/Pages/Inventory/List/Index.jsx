import React from "react";
import Authenticated from "@/Layouts/Authenticated";

import Table from "@/Components/Table";

const InventoryListIndex = ({ inventories }) => {
  // const { select, isSelected, onSelectChange, setSelect } = useSelect([]);
  const columns = [
    {
      name: "Warehouse",
      selector: "warehouse",
      format: (val) => val.name,
    },
    {
      name: "Location",
      selector: "location",
      format: (val) => val.name,
    },
    {
      name: "Product",
      selector: "product",
      format: (val) => val.name,
    },
    {
      name: "Quantity",
      selector: "quantity",
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

  return (
    <div>
      <Table
        columns={columns}
        data={inventories}
        // rowEdit={(row) => route("inbound.delivery.show", { id: row.id })}
        // rowDelete={(row) => handleDelete(row.id)}
      />
    </div>
  );
};

InventoryListIndex.layout = (page) => (
  <Authenticated user={page.props.auth.user} title="Inventory List">
    {page}
  </Authenticated>
);

export default InventoryListIndex;
