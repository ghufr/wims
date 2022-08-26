import React from "react";
import Authenticated from "@/Layouts/Authenticated";

import Table from "@/Components/Table";

const InventoryListIndex = ({ inventories }) => {
  // const { select, isSelected, onSelectChange, setSelect } = useSelect([]);
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
      name: "Address",
      selector: "address",
    },
    {
      name: "Address 2",
      selector: "address2",
    },
    {
      name: "City",
      selector: "city",
    },
    {
      name: "Postal",
      selector: "postalCode",
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
      <Table columns={columns} data={inventories} />
    </div>
  );
};

InventoryListIndex.layout = (page) => (
  <Authenticated user={page.props.auth.user} title="InventoryLists">
    {page}
  </Authenticated>
);

export default InventoryListIndex;
