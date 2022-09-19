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
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { Autocomplete } from "formik-mui";
import { Inertia } from "@inertiajs/inertia";

const PickingForm = ({ data, onFinish }) => {
  const [initialValues, setInitialValues] = useState({
    inventories: [],
  });
  const [deliveryOrders, setDeliveryOrders] = useState({});

  useEffect(() => {
    const fetchPickingList = async () => {
      const res = await axios.post(route("outbound.order.get.picking"), {
        deliveryOrderIds: data.deliveryOrderIds,
      });

      setDeliveryOrders(res.data.deliveryOrdersByWarehouse);
    };
    if (data.deliveryOrderIds.length > 0) {
      fetchPickingList();
    }
  }, [data.deliveryOrderIds]);

  const handleSubmit = (values) => {
    const transformed = {
      inventories: values.inventories.map((item) => ({
        location: item.location_id,
        product: item.product_id,
        deliveryOrder: item.deliveryOrder,
      })),
      deliveryOrderIds: data.deliveryOrderIds,
    };
    onFinish();
    Inertia.post(route("outbound.order.to.picking"), transformed);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form>
        <TableContainer component={Box}>
          {Object.keys(deliveryOrders).map((warehouseId) => {
            const deliveryOrder = deliveryOrders[warehouseId];
            const group = deliveryOrder[0];
            let index = 0;

            return (
              <Fragment key={warehouseId}>
                <Box sx={{ textAlign: "left", pb: 2 }}>
                  <table>
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: "500" }}>Origin</td>
                        <td>:</td>
                        <td>
                          {group.origin.name} - {group.origin.description}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "500" }}>Origin Addr.</td>
                        <td>:</td>
                        <td>{group.origin.address}</td>
                      </tr>
                      <tr style={{ height: 12 }}></tr>
                      <tr>
                        <td style={{ fontWeight: "500" }}>Destination</td>
                        <td>:</td>
                        <td>
                          {group.destination.name} -{" "}
                          {group.destination.description}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "500" }}>Dest. Addr.</td>
                        <td>:</td>
                        <td>{group.destination.address}</td>
                      </tr>
                    </tbody>
                  </table>
                </Box>

                <Table size="small" sx={{ mb: 4 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="none">Client</TableCell>
                      <TableCell padding="none">Product Name</TableCell>
                      <TableCell padding="none">Description</TableCell>
                      <TableCell padding="none">Qty</TableCell>
                      <TableCell padding="none">UoM</TableCell>
                      <TableCell padding="none">Pick Location</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {deliveryOrder.map((item, j) => {
                      return (
                        <Fragment key={j}>
                          {item.products.map((product, z) => (
                            <TableRow key={z}>
                              <TableCell padding="none">
                                {item.client && item.client.name}
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
                                          option.quantity || "0"
                                        })`
                                      : ""
                                  }
                                  isOptionEqualToValue={(option, value) =>
                                    option.id === value.id
                                  }
                                  options={product.locations.map(
                                    (location) => ({
                                      ...location,
                                      deliveryOrder: item.id,
                                    })
                                  )}
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
                      );
                    })}
                  </TableBody>
                </Table>
              </Fragment>
            );
          })}
          <Box sx={{ textAlign: "right" }}>
            <Button variant="contained" type="submit">
              Picking
            </Button>
          </Box>
        </TableContainer>
      </Form>
    </Formik>
  );
};

export default PickingForm;
