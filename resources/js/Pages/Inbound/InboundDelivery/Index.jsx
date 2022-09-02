import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";

import { ButtonGroup, Button, Modal, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useResource from "@/Hooks/useResource";

const InboundIndex = ({ inbounds, can }) => {
  const [select, setSelect] = useState(-1);
  const [selectedRows, setSelectedRows] = useState([]);
  const columns = [
    {
      headerName: "Inb. No",
      field: "inboundNo",
      flex: 1,
      minWidth: 100,
      maxWidth: 150,
      renderCell: (params) => (
        <Button
          sx={{ justifyContent: "flex-start", padding: 0 }}
          fullWidth
          onClick={() => setSelect(params.row.id)}
        >
          {params.row.inboundNo}
        </Button>
      ),
    },
    {
      headerName: "Delv. Date",
      field: "deliveryDate",
      minWidth: 100,
    },
    {
      headerName: "Supplier",
      field: "supplier",
      flex: 1,
      minWidth: 100,
      valueGetter: (params) => params.row.supplier.name,
    },
    {
      headerName: "Client",
      field: "client",
      flex: 1,
      minWidth: 80,
      valueGetter: (params) => params.row.supplier.name,
    },
    {
      headerName: "Status",
      field: "status",
      flex: 1,
      minWidth: 80,
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

  const { destroyMany } = useResource("inbound.delivery");

  return (
    <div>
      <Modal
        open={select > -1}
        onClose={() => setSelect(-1)}
        aria-labelledby="modal-title"
      >
        <Box sx={{ maxWidth: 700 }} className="modal-bg">
          <Typography id="modal-title" variant="h6" component="h2">
            {select ? "Edit" : "Create"} Product
          </Typography>
          <Box>
            {/* <ProductForm
              id={select}
              onFinish={() => setSelect(-1)}
              onCancel={() => setSelect(-1)}
            /> */}
          </Box>
        </Box>
      </Modal>
      <ButtonGroup
        variant="text"
        aria-label="outlined primary button group"
        sx={{ marginBottom: 2 }}
      >
        {can.create_Product && (
          <Button variant="contained" size="small" onClick={() => setSelect(0)}>
            Create
          </Button>
        )}
        {can.delete_Product && selectedRows.length > 0 && (
          <Button
            variant="outlined"
            size="small"
            onClick={() => destroyMany(selectedRows)}
          >
            Delete ({selectedRows.length})
          </Button>
        )}
      </ButtonGroup>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={inbounds}
          columns={columns}
          rowsPerPageOptions={[25, 50, 100]}
          onSelectionModelChange={(rows) => setSelectedRows(rows)}
          selectionModel={selectedRows}
          checkboxSelection
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
  //           <Button>Create Inbound</Button>
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

  //     {/* <DataGrid rows={inbounds} columns={columns} /> */}

  //     <Table
  //       columns={columns}
  //       data={inbounds}
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

InboundIndex.layout = (page) => (
  <Authenticated title="Inbound Deliveries">{page}</Authenticated>
);

export default InboundIndex;
