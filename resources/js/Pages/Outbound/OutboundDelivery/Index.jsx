import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
// import Modal from "@/Components/Modal";

import {
  ButtonGroup,
  Button,
  Box,
  Typography,
  Modal,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useResource from "@/Hooks/useResource";
import OutboundDeliveryForm from "@/Components/Forms/OutboundDeliveryForm";
import { Inertia } from "@inertiajs/inertia";

const OutboundDeliveryIndex = ({
  outbounds,
  warehouses,
  clients,
  customers,
  products,
  can,
}) => {
  const [select, setSelect] = useState(-1);
  const [modal, setModal] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const columns = [
    {
      headerName: "Out. No",
      field: "outboundNo",
      flex: 1,
      minWidth: 100,
      maxWidth: 150,
      renderCell: (params) => (
        <Button
          sx={{ justifyContent: "flex-start", padding: 0 }}
          fullWidth
          onClick={() => setSelect(params.row.id)}
        >
          {params.row.outboundNo}
        </Button>
      ),
    },
    {
      headerName: "Delv. Date",
      field: "deliveryDate",
      minWidth: 100,
    },
    // {
    //   headerName: "Client",
    //   field: "client",
    //   flex: 1,
    //   minWidth: 80,
    //   valueGetter: (params) => params.row.client.name,
    // },
    {
      headerName: "Origin",
      field: "origin.name",
      valueGetter: (params) => params.row.origin.name,
    },
    {
      headerName: "Origin Addr.",
      field: "origin.address",
      valueGetter: (params) => params.row.origin.address,
    },
    {
      headerName: "Destination",
      field: "destination.name",
      valueGetter: (params) => params.row.destination.name,
    },

    {
      headerName: "Destination Addr.",
      field: "destination.address",
      valueGetter: (params) => params.row.destination.address,
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

  const { destroyMany } = useResource("outbound.delivery");

  const handleStoreMany = async (e) => {
    e.preventDefault();
    const data = {
      outboundIds: selectedRows,
      deliveryDate: e.target.deliveryDate.value,
    };
    setModal("");
    setSelectedRows([]);

    await Inertia.post(route("outbound.order.from.outbound"), data);
  };

  return (
    <div>
      <Modal
        open={select > -1}
        onClose={() => setSelect(-1)}
        aria-labelledby="modal-title"
      >
        <Box sx={{ maxWidth: 700 }} className="modal-bg">
          <Typography id="modal-title" variant="h6" component="h2">
            {select ? "Edit" : "Create"} Outbound Delivery
          </Typography>
          <Box>
            <OutboundDeliveryForm
              id={select}
              onFinish={() => setSelect(-1)}
              onCancel={() => setSelect(-1)}
              data={{
                warehouses,
                clients,
                customers,
                products,
              }}
            />
          </Box>
        </Box>
      </Modal>
      <Modal
        open={modal === "deliveryOrder"}
        onClose={() => {
          setModal("");
        }}
      >
        <Box sx={{ maxWidth: 400 }} className="modal-bg">
          <Box component="form" onSubmit={handleStoreMany}>
            <TextField
              name="deliveryDate"
              label="Delivery Date"
              size="small"
              // defaultValue={new Date().toISOString()}
              autoFocus
              fullWidth
              margin="dense"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <Box textAlign="right" sx={{ mt: 2 }}>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <ButtonGroup
        variant="text"
        aria-label="outlined primary button group"
        sx={{ marginBottom: 2 }}
      >
        {can.create_OutboundDelivery && (
          <Button variant="contained" size="small" onClick={() => setSelect(0)}>
            Create
          </Button>
        )}
        {can.delete_OutboundDelivery && selectedRows.length > 0 && (
          <Button
            variant="outlined"
            size="small"
            onClick={() => destroyMany(selectedRows)}
          >
            Delete ({selectedRows.length})
          </Button>
        )}
        {can.create_DeliveryOrder && selectedRows.length > 0 && (
          <Button
            variant="outlined"
            color="success"
            size="small"
            onClick={() => setModal("deliveryOrder")}
          >
            Delivery Order ({selectedRows.length})
          </Button>
        )}
      </ButtonGroup>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={outbounds}
          columns={columns}
          rowsPerPageOptions={[25, 50, 100]}
          onSelectionModelChange={(rows) => setSelectedRows(rows)}
          isRowSelectable={(params) => params.row.status == "OPEN"}
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

OutboundDeliveryIndex.layout = (page) => (
  <Authenticated title="Outbound Delivery">{page}</Authenticated>
);

export default OutboundDeliveryIndex;
