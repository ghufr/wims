import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
// import Modal from "@/Components/Modal";

import { ButtonGroup, Button, Box, Typography, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import LocationForm from "@/Components/Forms/LocationForm";
import useResource from "@/Hooks/useResource";

const LocationIndex = ({ locations, warehouses, can = {} }) => {
  const [select, setSelect] = useState();
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
      headerName: "Warehouse",
      field: "warehouse",
      flex: 1,
      minWidth: 80,
      valueGetter: (params) => params.row.warehouse.name,
    },
    {
      headerName: "Section",
      field: "section",
      flex: 1,
      minWidth: 80,
    },
    {
      headerName: "Type",
      field: "type",
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

  const { destroyMany } = useResource("master.users");

  return (
    <div>
      <Modal
        open={select > -1}
        onClose={() => setSelect(-1)}
        aria-labelledby="modal-title"
      >
        <Box sx={{ maxWidth: 500 }} className="modal-bg">
          <Typography id="modal-title" variant="h6" component="h2">
            {select ? "Edit" : "Create"} Location
          </Typography>
          <Box>
            <LocationForm
              id={select}
              onFinish={() => setSelect(-1)}
              onCancel={() => setSelect(-1)}
              data={{ warehouses }}
            />
          </Box>
        </Box>
      </Modal>
      <ButtonGroup
        variant="text"
        aria-label="outlined primary button group"
        sx={{ marginBottom: 2 }}
      >
        {can.create_Location && (
          <Button variant="contained" size="small" onClick={() => setSelect(0)}>
            Create
          </Button>
        )}
        {can.delete_Location && selectedRows.length > 0 && (
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
          rows={locations}
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

LocationIndex.layout = (page) => (
  <Authenticated title="Locations">{page}</Authenticated>
);

export default LocationIndex;
