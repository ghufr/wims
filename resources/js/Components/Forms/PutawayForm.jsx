import React, { Fragment } from "react";

import {
  Autocomplete,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const PutawayForm = ({ data }) => {
  const [options, setOptions] = useState({
    locations: {},
  });
  const [values, setValues] = useState([]);
  const [goodsReceipts, setGoodsReceipts] = useState({});

  useEffect(() => {
    const fetchPutawayList = async () => {
      const res = await axios.post(route("inbound.receipt.get.putaway"), {
        goodsReceiptIds: data.goodsReceiptIds,
      });

      setOptions({ locations: res.data.locations });
      setGoodsReceipts(res.data.goodsReceiptsByWarehouse);
    };
    if (data.goodsReceiptIds.length > 0) {
      fetchPutawayList();
    }
  }, [data.goodsReceiptIds]);

  const handleSubmit = () => {
    //
  };

  const handleOnLocationChange = () => {};

  return (
    <TableContainer component={Box}>
      {Object.keys(goodsReceipts).map((warehouseId) => {
        const goodsReceipt = goodsReceipts[warehouseId];
        return (
          <Fragment key={warehouseId}>
            <p>Warehouse: {goodsReceipt[0].warehouse.name}</p>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell padding="none">Client</TableCell>

                  <TableCell padding="none">Product Name</TableCell>
                  <TableCell padding="none">Description</TableCell>
                  <TableCell padding="none">Qty</TableCell>
                  <TableCell padding="none">UoM</TableCell>
                  <TableCell padding="none">Dest. Location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {goodsReceipt.map((item, j) => {
                  return (
                    <Fragment key={j}>
                      {item.products.map((product, z) => (
                        <TableRow key={z}>
                          <TableCell padding="none">
                            {goodsReceipt[0].client.name}
                          </TableCell>
                          <TableCell padding="none">
                            {product.pivot.name}
                          </TableCell>
                          <TableCell padding="none">
                            {product.pivot.description}
                          </TableCell>
                          <TableCell padding="none">
                            {product.pivot.quantity}
                          </TableCell>
                          <TableCell padding="none">
                            {product.pivot.baseUom}
                          </TableCell>
                          <TableCell padding="none" sx={{ maxWidth: 160 }}>
                            <Autocomplete
                              name="location"
                              // component={Autocomplete}
                              getOptionLabel={(option) =>
                                option.name ? `${option.name}` : ""
                              }
                              isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                              }
                              options={options.locations[warehouseId]}
                              // disabled={loading}
                              // onChange={handleOnLocationChange}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Location"
                                  size="small"
                                  required
                                  fullWidth
                                  name="location"
                                  margin="dense"
                                />
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </Fragment>
        );
      })}
      <Box sx={{ textAlign: "right" }}>
        <Button variant="contained" onClick={handleSubmit}>
          Putaway
        </Button>
      </Box>
    </TableContainer>
  );
};

export default PutawayForm;
