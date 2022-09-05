import React, { useEffect } from "react";

import { Formik, Form } from "formik";
import {
  Box,
  Button,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useResource from "@/Hooks/useResource";
import ProductListForm from "./Shared/ProductListForm";

const DeliveryOrderForm = ({ id, data = {}, onFinish, onCancel }) => {
  const [loading, setLoading] = useState(id > 0);
  const [initialValues, setInitialValues] = useState({
    outboundNo: "",
    doNo: "",
    deliveryDate: "",
    client: {},
    products: [{ name: "", description: "" }],
    origin: {},
    destination: {},
  });

  const resource = useResource("outbound.order");

  useEffect(() => {
    const fetchData = async () => {
      const res = await resource.findById(id);
      setInitialValues({ ...initialValues, ...res.data.order });
      setLoading(res.data.order.status != "OPEN");
    };
    if (id > 0) {
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (values) => {
    const data = {
      deliveryDate: values.deliveryDate,
      // inboundNo: values.inboundNo || null,
      client: values.client.id,
      origin: values.origin.id,
      destination: values.destination.id,
      products: values.products.map((product) => ({
        id: product.id,
        quantity: product.quantity,
        price: product.price,
      })),
    };
    if (id > 0) {
      await resource.update(id, data);
    } else {
      await resource.create(data);
    }
    onFinish();
  };

  return (
    <Box>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values, errors, handleChange, setFieldValue, isSubmitting }) => (
          <Form>
            <TextField
              value={values.outboundNo}
              onChange={handleChange}
              name="outboundNo"
              label="Out. No"
              size="small"
              error={errors.outboundNo}
              helperText={errors.outboundNo}
              autoFocus
              fullWidth
              margin="dense"
              type="text"
              readOnly={loading}
              disabled
            />
            <Autocomplete
              disablePortal
              readOnly={loading}
              fullWidth
              id="client"
              name="client"
              value={values.client.name || ""}
              onChange={(e, nVal) => {
                setFieldValue("client", nVal || {});
              }}
              inputValue={
                values.client.name
                  ? `${values.client.name} - ${values.client.description}`
                  : ""
              }
              options={
                data.clients &&
                data.clients.map(({ name, description, id }) => ({
                  label: `${name} - ${description}`,
                  value: name,
                  id,
                  name,
                  description,
                }))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Client"
                  size="small"
                  required
                  fullWidth
                  name="client"
                  margin="dense"
                />
              )}
            />
            <Autocomplete
              disablePortal
              readOnly={loading}
              fullWidth
              id="origin"
              value={values.origin.name || ""}
              onChange={(e, nVal) => {
                setFieldValue("origin", nVal || {});
              }}
              inputValue={
                values.origin.name
                  ? `${values.origin.name} - ${values.origin.description}`
                  : ""
              }
              options={
                data.warehouses &&
                data.warehouses.map(({ name, description, address, id }) => ({
                  label: `${name} - ${description}`,
                  value: name,
                  id,
                  name,
                  description,
                  address,
                }))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Origin"
                  size="small"
                  required
                  fullWidth
                  name="origin"
                  margin="dense"
                  helperText={(values.origin && values.origin.address) || ""}
                />
              )}
            />

            <Autocomplete
              disablePortal
              readOnly={loading}
              fullWidth
              id="destination"
              value={values.destination.name || ""}
              onChange={(e, nVal) => {
                setFieldValue("destination", nVal || {});
              }}
              inputValue={
                values.destination.name
                  ? `${values.destination.name} - ${values.destination.description}`
                  : ""
              }
              options={
                data.customers &&
                data.customers.map(({ name, description, address, id }) => ({
                  label: `${name} - ${description}`,
                  value: name,
                  id,
                  name,
                  description,
                  address,
                }))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Destination"
                  size="small"
                  required
                  fullWidth
                  name="destination"
                  margin="dense"
                  helperText={
                    (values.destination && values.destination.address) || ""
                  }
                />
              )}
            />

            <TextField
              value={values.deliveryDate}
              onChange={handleChange}
              name="deliveryDate"
              label="Delv. Date"
              size="small"
              error={errors.deliveryDate}
              helperText={errors.deliveryDate}
              autoFocus
              fullWidth
              margin="dense"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              readOnly={loading}
              required
            />

            <hr />
            <Typography variant="h6">Products</Typography>

            <ProductListForm
              values={values}
              setFieldValue={setFieldValue}
              loading={loading}
              data={data}
            />
            <Box sx={{ textAlign: "right", mt: 2 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={onCancel}
                sx={{ mr: 2 }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="small"
                type="submit"
                disabled={loading || isSubmitting}
              >
                Save
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default DeliveryOrderForm;
