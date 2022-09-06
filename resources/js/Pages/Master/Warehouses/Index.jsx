import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
// import Modal from "@/Components/Modal";

import { ButtonGroup, Button, Box, Typography, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import WarehouseForm from "@/Components/Forms/WarehouseForm";
import useResource from "@/Hooks/useResource";

const WarehouseIndex = ({ warehouses, can }) => {
  const [select, setSelect] = useState(-1);
  const [selectedRows, setSelectedRows] = useState([]);
  const columns = [
    {
      headerName: "Name",
      field: "name",
      flex: 1,
      minWidth: 100,
      maxWidth: 150,
      renderCell: (params) => (
        <Button
          sx={{ justifyContent: "flex-start", padding: 0 }}
          fullWidth
          onClick={() => setSelect(params.row.id)}
        >
          {params.row.name}
        </Button>
      ),
    },
    {
      headerName: "Description",
      field: "description",
      flex: 1,
      minWidth: 100,
    },
    {
      headerName: "Address",
      field: "address",
      flex: 1,
      minWidth: 100,
    },
    {
      headerName: "Address 2",
      field: "address2",
      flex: 1,
    },
    {
      headerName: "City",
      field: "city",
      flex: 1,
    },
    {
      headerName: "Postal",
      field: "postalCode",
      flex: 1,
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
    },
  ];

  const { destroyMany } = useResource("master.warehouses");

  return (
    <div>
      <Modal
        open={select >= 0}
        onClose={() => setSelect(-1)}
        aria-labelledby="modal-title"
      >
        <Box sx={{ maxWidth: 500 }} className="modal-bg">
          <Typography id="modal-title" variant="h6" component="h2">
            {select ? "Edit" : "Create"} Warehouse
          </Typography>
          <Box>
            <WarehouseForm
              id={select}
              onFinish={() => setSelect(-1)}
              onCancel={() => setSelect(-1)}
            />
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
          rows={warehouses}
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
};

WarehouseIndex.layout = (page) => (
  <Authenticated title="Warehouses">{page}</Authenticated>
);

export default WarehouseIndex;
