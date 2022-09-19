import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";

// import Modal from "@/Components/Modal";

import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Modal } from "@mui/material";
// import useResource from "@/Hooks/useResource";

const InventoryListIndex = ({ inventories }) => {
  const [select, setSelect] = useState(-1);
  // const [selectedRows, setSelectedRows] = useState([]);
  const columns = [
    {
      headerName: "Warehouse",
      field: "warehouse",
      flex: 1,
      minWidth: 80,
      maxWidth: 100,
      valueGetter: (params) => params.row.warehouse.name,
      // renderCell: (params) => (
      //   <Button
      //     sx={{ justifyContent: "flex-start", padding: 0 }}
      //     fullWidth
      //     onClick={() => setSelect(params.row.id)}
      //   >
      //     {params.row.inboundNo}
      //   </Button>
      // ),
    },
    {
      headerName: "Client",
      field: "client",
      minWidth: 100,
      valueGetter: (params) => params.row.client.name,
    },
    {
      headerName: "Location",
      field: "location",
      minWidth: 100,
      valueGetter: (params) => params.row.location.name,
    },
    {
      headerName: "Product",
      field: "product",
      minWidth: 100,
      flex: 1,
      valueGetter: (params) => params.row.product.name,
    },
    {
      headerName: "Quantity",
      field: "quantity",
      flex: 1,
      maxWidth: 100,
      valueGetter: (params) => `${params.row.quantity}`,
    },
    {
      headerName: "BaseUom",
      field: "baseUom",
      minWidth: 100,
      valueGetter: (params) => params.row.baseUom,
    },
    {
      headerName: "Avg. Price",
      field: "avgPrice",
      flex: 1,
      maxWidth: 100,
      // valueGetter: (params) => `${params.row.quantity}`,
    },
    {
      headerName: "Updated At",
      field: "updated_at",
      valueGetter: (params) =>
        new Date(params.row.updated_at).toLocaleDateString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      flex: 1,
      minWidth: 100,
    },
  ];

  return (
    <div>
      <Modal
        open={select > -1}
        onClose={() => setSelect(-1)}
        aria-labelledby="modal-title"
      >
        <Box sx={{ maxWidth: 700 }} className="modal-bg">
          <Typography id="modal-title" variant="h6" component="h2">
            Inventory
          </Typography>
          <Box></Box>
        </Box>
      </Modal>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={inventories}
          columns={columns}
          rowsPerPageOptions={[25]}
          density="compact"
          autoHeight
          disableSelectionOnClick
          onRowDoubleClick={(params) => setSelect(params.row.id)}
        />
      </div>
    </div>
  );

  // const { select, isSelected, onSelectChange, setSelect } = useSelect([]);
  // const columns = [

  //   {
  //     name: "Updated At",
  //     selector: "updated_at",
  //     format: (column) =>
  //       new Date(column).toLocaleDateString("id-ID", {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       }),
  //   },
  // ];

  // const { handleDelete, handleMassDelete } = useDelete(
  //   "inbound.delivery.destroy"
  // );

  // return (
  //   <div>
  //     <div className="mb-4">
  //       <div className="flex space-x-3 items-center text-gray-500">
  //         <Link href={route("inbound.delivery.create")}>
  //           <Button>Create InventoryList</Button>
  //         </Link>
  //         {isSelected && (
  //           <>
  //             <Button outline onClick={() => {}}>
  //               Goods Receipt ({select.length})
  //             </Button>
  //             <Button outline onClick={() => handleMassDelete(select)}>
  //               Delete Selected ({select.length})
  //             </Button>
  //           </>
  //         )}
  //       </div>
  //     </div>

  //     {/* <DataGrid rows={inventories} columns={columns} /> */}

  //     <Table
  //       columns={columns}
  //       data={inventories}
  //       selectableRows
  //       onSelectedRowsChange={(item) => onSelectChange(item.id)}
  //       onSelectAll={setSelect}
  //       selectedRows={select}
  //       rowEdit={(row) => route("inbound.delivery.show", { id: row.id })}
  //       rowDelete={(row) => handleDelete(row.id)}
  //     />
  //   </div>
  // );
};

InventoryListIndex.layout = (page) => (
  <Authenticated title="Inventory List">{page}</Authenticated>
);

export default InventoryListIndex;
