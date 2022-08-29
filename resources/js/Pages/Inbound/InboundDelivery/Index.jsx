import React from "react";
import Authenticated from "@/Layouts/Authenticated";

import { Link } from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import Table from "@/Components/Table";
import useSelect from "@/Hooks/useSelect";
import useDelete from "@/Hooks/useDelete";

const InboundIndex = ({ inbounds }) => {
  const { select, isSelected, onSelectChange, setSelect } = useSelect([]);
  const columns = [
    {
      name: "Inb. No",
      selector: "inboundNo",
    },
    {
      name: "Delv. Date",
      selector: "deliveryDate",
    },
    {
      name: "Supplier",
      selector: "supplier",
      format: (val) => val.name,
    },
    {
      name: "Client",
      selector: "client",
      format: (val) => val.name,
    },
    {
      name: "Status",
      selector: "status",
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
    "inbound.delivery.destroy"
  );

  return (
    <div>
      <div className="mb-4">
        <div className="flex space-x-3 items-center text-gray-500">
          <Link href={route("inbound.delivery.create")}>
            <Button>Create Inbound</Button>
          </Link>
          {isSelected && (
            <>
              <Button outline onClick={() => {}}>
                Goods Receipt ({select.length})
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
        data={inbounds}
        selectableRows
        onSelectedRowsChange={(item) => onSelectChange(item.id)}
        onSelectAll={setSelect}
        selectedRows={select}
        rowEdit={(row) => route("inbound.delivery.show", { id: row.id })}
        rowDelete={(row) => handleDelete(row.id)}
      />
    </div>
  );
};

InboundIndex.layout = (page) => (
  <Authenticated title="Inbound Deliveries">{page}</Authenticated>
);

export default InboundIndex;
