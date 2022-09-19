import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";

// import Modal from "@/Components/Modal";
import PutawayForm from "@/Components/Forms/PutawayForm";

import { ButtonGroup, Button, Box, Typography, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useResource from "@/Hooks/useResource";
import GoodsReceiptForm from "@/Components/Forms/GoodsReceiptForm";

const GoodsReceiptIndex = ({
  receipts,
  warehouses,
  clients,
  suppliers,
  products,
  can,
}) => {
  const [select, setSelect] = useState(-1);
  const [modal, setModal] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const columns = [
    {
      headerName: "GR. No",
      field: "grNo",
      flex: 1,
      minWidth: 130,
      maxWidth: 150,
      renderCell: (params) => (
        <Button
          sx={{ justifyContent: "flex-start", padding: 0 }}
          fullWidth
          onClick={() => setSelect(params.row.id)}
        >
          {params.row.grNo}
        </Button>
      ),
    },
    {
      headerName: "Inb. No",
      field: "inboundNo",
      minWidth: 130,
      flex: 1,
    },
    {
      headerName: "GR Date",
      field: "grDate",
      minWidth: 100,
    },
    {
      headerName: "Status",
      field: "status",
      // minWidth: 80,
      // valueGetter: (params) => params.row.status,
    },
    {
      headerName: "Warehouse",
      field: "warehouse",
      flex: 1,
      minWidth: 100,
      valueGetter: (params) => params.row.warehouse.name,
    },

    // {
    //   headerName: "Status",
    //   field: "status",
    //   flex: 1,
    //   minWidth: 80,
    // },
    // {
    //   headerName: "Reference",
    //   field: "reference",
    //   flex: 1,
    //   minWidth: 100,
    // },
    {
      headerName: "Supplier",
      field: "supplier",
      flex: 1,
      minWidth: 80,
      valueGetter: (params) => params.row.supplier.name,
    },
    {
      headerName: "Client",
      field: "client",
      flex: 1,
      minWidth: 80,
      valueGetter: (params) => params.row.client.name,
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
  // const [initialValues, setInitialValues] = useState();

  const { destroyMany } = useResource("inbound.receipt");

  return (
    <div>
      <Modal
        open={select > -1}
        onClose={() => setSelect(-1)}
        aria-labelledby="modal-title"
      >
        <Box sx={{ maxWidth: 700 }} className="modal-bg">
          <Typography id="modal-title" variant="h6" component="h2">
            {select ? "Edit" : "Create"} Goods Receipt
          </Typography>
          <Box>
            <GoodsReceiptForm
              data={{ warehouses, clients, suppliers, products }}
              id={select}
              onFinish={() => setSelect(-1)}
              onCancel={() => setSelect(-1)}
            />
          </Box>
        </Box>
      </Modal>

      <Modal
        open={modal === "putaway"}
        onClose={() => setModal("")}
        aria-labelledby="modal-title"
      >
        <Box sx={{ maxWidth: 700 }} className="modal-bg">
          <Typography id="modal-title" variant="h6" component="h2">
            Putaway List
          </Typography>
          <PutawayForm
            data={{ goodsReceiptIds: selectedRows }}
            onFinish={() => {
              setModal("");
              setSelectedRows([]);
            }}
          />
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
            color="error"
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
            onClick={() => setModal("putaway")}
          >
            Putaway ({selectedRows.length})
          </Button>
        )}
      </ButtonGroup>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={receipts}
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

GoodsReceiptIndex.layout = (page) => (
  <Authenticated title="Goods Receipt">{page}</Authenticated>
);

export default GoodsReceiptIndex;
