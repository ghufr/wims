import React from "react";
import Authenticated from "@/Layouts/Authenticated";

import { Link } from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import Table from "@/Components/Table";
import useSelect from "@/Hooks/useSelect";
import useDelete from "@/Hooks/useDelete";

const GoodsReceiptIndex = ({ receipts }) => {
  const { select, isSelected, onSelectChange, setSelect } = useSelect([]);
  const columns = [
    {
      name: "GR. No.",
      selector: "grNo",
    },
    {
      name: "GR Date",
      selector: "grDate",
    },
    {
      name: "Reference",
      selector: "reference",
    },
    {
      name: "Inb. No.",
      selector: "inboundNo",
    },
    {
      name: "Warehouse",
      selector: "warehouse",
      format: (val) => val && val.name,
    },
    {
      name: "Supplier",
      selector: "supplier",
      format: (val) => val && val.name,
    },
    {
      name: "Client",
      selector: "client",
      format: (val) => val && val.name,
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
    "inbound.receipt.destroy"
  );

  return (
    <div>
      <div className="mb-4">
        <div className="flex space-x-3 items-center text-gray-500">
          <Link href={route("inbound.receipt.create")}>
            <Button>Create Goods Receipt</Button>
          </Link>
          {isSelected && (
            <>
              <Button outline onClick={() => {}}>
                Putaway ({select.length})
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
        data={receipts}
        selectableRows
        onSelectedRowsChange={(item) => onSelectChange(item.id)}
        onSelectAll={setSelect}
        selectedRows={select}
        rowEdit={(row) => route("inbound.receipt.show", { id: row.id })}
        rowDelete={(row) => handleDelete(row.id)}
      />
    </div>
  );
};

GoodsReceiptIndex.layout = (page) => (
  <Authenticated user={page.props.auth.user} title="Goods Receipts">
    {page}
  </Authenticated>
);

export default GoodsReceiptIndex;
