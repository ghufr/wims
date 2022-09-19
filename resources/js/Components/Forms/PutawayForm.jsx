import React, { Fragment } from "react";

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField as MuiTextField,
  // Autocomplete,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

import { Field, Form, Formik } from "formik";
import { Autocomplete } from "formik-mui";
import { Inertia } from "@inertiajs/inertia";

const PutawayForm = ({ data, onFinish }) => {
  const [initialValues, setInitialValues] = useState({
    inventories: [],
  });
  const [goodsReceipts, setGoodsReceipts] = useState({});

  useEffect(() => {
    const fetchPutawayList = async () => {
      const res = await axios.post(route("inbound.receipt.get.putaway"), {
        goodsReceiptIds: data.goodsReceiptIds,
      });

      setGoodsReceipts(res.data.goodsReceiptsByWarehouse);
    };
    if (data.goodsReceiptIds.length > 0) {
      fetchPutawayList();
    }
  }, [data.goodsReceiptIds]);

  const handleSubmit = (values) => {
    const transformed = {
      inventories: values.inventories.map((item) => ({
        location: item.location_id,
        product: item.product_id,
        goodsReceipt: item.goodsReceipt,
      })),
      goodsReceiptIds: data.goodsReceiptIds,
    };
    onFinish();
    Inertia.post(route("inbound.receipt.to.putaway"), transformed);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form>
        <TableContainer component={Box}>
          {Object.keys(goodsReceipts).map((warehouseId) => {
            const goodsReceipt = goodsReceipts[warehouseId];
            const group = goodsReceipt[0];
            let index = 0;
            return (
              <Fragment key={warehouseId}>
                <Box sx={{ textAlign: "left", pb: 2 }}>
                  <table>
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: "500" }}>Warehouse</td>
                        <td>:</td>
                        <td>
                          {group.warehouse.name} - {group.warehouse.description}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Box>
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
                    {goodsReceipt.map((item, j) => (
                      <Fragment key={j}>
                        {item.products.map((product, z) => (
                          <TableRow key={z}>
                            <TableCell padding="none">
                              {group.client.name}
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
                              <Field
                                component={Autocomplete}
                                name={`inventories[${index++}]`}
                                getOptionLabel={(option) =>
                                  option.location
                                    ? `${option.location.name} (${
                                        option.quantity || "New"
                                      })`
                                    : ""
                                }
                                isOptionEqualToValue={(option, value) =>
                                  option.id === value.id
                                }
                                options={product.locations.map((location) => ({
                                  ...location,
                                  goodsReceipt: item.id,
                                }))}
                                renderInput={(params) => (
                                  <MuiTextField
                                    {...params}
                                    label="Location"
                                    size="small"
                                    required
                                    fullWidth
                                    margin="dense"
                                  />
                                )}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </Fragment>
                    ))}
                  </TableBody>
                </Table>
              </Fragment>
            );
          })}
          <Box sx={{ textAlign: "right" }}>
            <Button variant="contained" type="submit">
              Putaway
            </Button>
          </Box>
        </TableContainer>
      </Form>
    </Formik>
  );
};

export default PutawayForm;
