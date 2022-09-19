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

const GoodsReceiptForm = ({ id, data = {}, onFinish, onCancel }) => {
  const [loading, setLoading] = useState(id > 0);
  const [initialValues, setInitialValues] = useState({
    inboundNo: "",
    grNo: "",
    grDate: "",
    client: "",
    supplier: "",
    products: [],
    warehouse: "",
  });

  const resource = useResource("inbound.receipt");

  useEffect(() => {
    const fetchData = async () => {
      const res = await resource.findById(id);
      setInitialValues({ ...initialValues, ...res.data.receipt });
      setLoading(res.data.receipt.reference != null);
    };

    if (id > 0) {
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (values) => {
    const data = {
      grDate: values.grDate,
      // inboundNo: values.inboundNo || null,
      client: values.client.id,
      supplier: values.supplier.id,
      warehouse: values.warehouse.id,
      products: values.products.map((product) => ({
        id: product.id || product.product_id,
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
              value={values.inboundNo}
              onChange={handleChange}
              name="inboundNo"
              label="Inb. No"
              size="small"
              error={errors.inboundNo}
              helperText={errors.inboundNo}
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
              id="warehouse"
              value={values.warehouse.name || ""}
              onChange={(e, nVal) => {
                setFieldValue("warehouse", nVal || {});
              }}
              inputValue={
                values.warehouse.name
                  ? `${values.warehouse.name} - ${values.warehouse.description}`
                  : ""
              }
              options={
                data.warehouses &&
                data.warehouses.map(({ name, description, id }) => ({
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
                  label="Warehouse"
                  size="small"
                  required
                  fullWidth
                  name="warehouse"
                  margin="dense"
                />
              )}
            />

            <Autocomplete
              disablePortal
              readOnly={loading}
              fullWidth
              id="supplier"
              value={values.supplier.name || ""}
              onChange={(e, nVal) => {
                setFieldValue("supplier", nVal || {});
              }}
              inputValue={
                values.supplier.name
                  ? `${values.supplier.name} - ${values.supplier.description}`
                  : ""
              }
              options={
                data.suppliers &&
                data.suppliers.map(({ name, description, id }) => ({
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
                  label="Supplier"
                  size="small"
                  required
                  fullWidth
                  name="supplier"
                  margin="dense"
                />
              )}
            />

            <TextField
              value={values.grDate}
              onChange={handleChange}
              name="grDate"
              label="GR. Date"
              size="small"
              error={errors.grDate}
              helperText={errors.grDate}
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

export default GoodsReceiptForm;
