import React from "react";
import Authenticated from "@/Layouts/Authenticated";

import { Link } from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import Table from "@/Components/Table";
import useSelect from "@/Hooks/useSelect";
import useDelete from "@/Hooks/useDelete";

const DeliveryOrderIndex = ({ orders = {} }) => {
  const { select, isSelected, onSelectChange, setSelect } = useSelect([]);
  const columns = [
    {
      name: "DO. No",
      selector: "doNo",
    },
    {
      name: "Delv. Date",
      selector: "deliveryDate",
    },
    {
      name: "Reference",
      selector: "reference",
    },
    {
      name: "Out. No.",
      selector: "outboundNo",
    },
    {
      name: "Client",
      selector: "client",
      format: (val) => val && val.name,
    },
    {
      name: "Origin",
      selector: "origin",
      format: (val) => val && val.name,
    },
    {
      name: "Origin Addr.",
      selector: "origin",
      format: (val) => val && val.address,
    },
    {
      name: "Destination",
      selector: "destination",
      format: (val) => val && val.name,
    },
    {
      name: "Dest. Addr.",
      selector: "destination",
      format: (val) => val && val.address,
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
    "outbound.order.destroy"
  );

  return (
    <div>
      <div className="mb-4">
        <div className="flex space-x-3 items-center text-gray-500">
          <Link href={route("outbound.order.create")}>
            <Button>Create Delivery Order</Button>
          </Link>
          {isSelected && (
            <>
              <Button outline onClick={() => {}}>
                Picking ({select.length})
              </Button>
              <Button outline onClick={() => handleMassDelete(select)}>
                Delete Selected ({select.length})
              </Button>
            </>
          )}
        </div>
      </div>

      <Table
        columns={columns}
        data={orders}
        selectableRows
        onSelectedRowsChange={(item) => onSelectChange(item.id)}
        onSelectAll={setSelect}
        selectedRows={select}
        rowEdit={(row) => route("outbound.order.show", { id: row.id })}
        rowDelete={(row) => handleDelete(row.id)}
      />
    </div>
  );
};

DeliveryOrderIndex.layout = (page) => (
  <Authenticated title="Delivery Order">{page}</Authenticated>
);

export default DeliveryOrderIndex;
