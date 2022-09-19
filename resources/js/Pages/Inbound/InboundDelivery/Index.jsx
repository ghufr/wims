import React, { useEffect, useState } from "react";
import Authenticated from "@/Layouts/Authenticated";

import {
  ButtonGroup,
  Button,
  Box,
  Typography,
  Modal,
  TextField,
} from "@mui/material";
// import Modal from "@/Components/Modal";
import { DataGrid } from "@mui/x-data-grid";
import useResource from "@/Hooks/useResource";
import InboundDeliveryForm from "@/Components/Forms/InboundDeliveryForm";
import { Inertia } from "@inertiajs/inertia";

const InboundIndex = ({
  inbounds,
  warehouses,
  clients,
  suppliers,
  products,
  // inbound,
  can,
}) => {
  const [select, setSelect] = useState(-1);
  const [modal, setModal] = useState("");
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
      headerName: "Warehouse",
      field: "warehouse",
      flex: 1,
      minWidth: 100,
      valueGetter: (params) => params.row.warehouse.name,
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

  const handleStoreMany = async (e) => {
    e.preventDefault();
    const data = {
      inboundIds: selectedRows,
      grDate: e.target.grDate.value,
    };
    setModal("");
    setSelectedRows([]);

    await Inertia.post(route("inbound.receipt.from.inbound"), data);
  };

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
            {select > 0 ? "Edit" : "Create"} Inbound Delivery
          </Typography>
          <Box>
            <InboundDeliveryForm
              data={{
                warehouses,
                clients,
                suppliers,
                products,
              }}
              id={select}
              onFinish={() => setSelect(-1)}
              onCancel={() => setSelect(-1)}
            />
          </Box>
        </Box>
      </Modal>
      <Modal open={modal === "goodsReceipt"} onClose={() => setModal("")}>
        <Box sx={{ maxWidth: 400 }} className="modal-bg">
          <Box component="form" onSubmit={handleStoreMany}>
            <TextField
              name="grDate"
              label="GR. Date"
              size="small"
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
        {can.create_GoodsReceipt && selectedRows.length > 0 && (
          <Button
            variant="outlined"
            color="success"
            size="small"
            onClick={() => setModal("goodsReceipt")}
          >
            Goods Receipt ({selectedRows.length})
          </Button>
        )}
      </ButtonGroup>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={inbounds}
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

InboundIndex.layout = (page) => (
  <Authenticated title="Inbound Deliveries">{page}</Authenticated>
);

export default InboundIndex;
