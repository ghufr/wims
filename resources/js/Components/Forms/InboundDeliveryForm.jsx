import React, { useEffect } from "react";

import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  Typography,
  TextField as MuiTextField,
} from "@mui/material";
import { useState } from "react";
import useResource from "@/Hooks/useResource";
import { Autocomplete, TextField } from "formik-mui";
import ProductListForm from "./Shared/ProductListForm";

const InboundDeliveryForm = ({ id, data = {}, onFinish, onCancel }) => {
  const [loading, setLoading] = useState(id > 0);
  const [initialValues, setInitialValues] = useState({
    inboundNo: "",
    deliveryDate: "",
    client: {},
    supplier: {},
    products: [{ name: "", description: "" }],
    warehouse: {},
    status: "",
  });

  const resource = useResource("inbound.delivery");

  useEffect(() => {
    const fetchData = async () => {
      const res = await resource.findById(id);
      setInitialValues({ ...initialValues, ...res.data.inbound });
      setLoading(res.data.inbound.status != "OPEN");
    };
    if (id > 0) {
      fetchData();
    }
  }, [id]);

  const transform = (values) => ({
    deliveryDate: values.deliveryDate,
    inboundNo: values.inboundNo,
    client: values.client.id,
    supplier: values.supplier.id,
    warehouse: values.warehouse.id,
    products: values.products.map((product) => ({
      id: product.id || product.product_id,
      quantity: product.quantity,
      price: product.price,
    })),
  });

  const handleSubmit = async (values) => {
    const data = transform(values);
    console.log(data);
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
        {({ values, errors, setFieldValue, isSubmitting }) => (
          <Form>
            <Field
              component={TextField}
              name="inboundNo"
              label="Inb. No"
              size="small"
              error={errors.inboundNo}
              helperText={errors.inboundNo}
              autoFocus
              fullWidth
              margin="dense"
              type="text"
              disabled
            />
            <Field
              component={Autocomplete}
              disablePortal
              disabled={loading}
              fullWidth
              id="client"
              name="client"
              getOptionLabel={(option) =>
                option.name ? `${option.name} - ${option.description}` : ""
              }
              options={data.clients}
              renderInput={(params) => (
                <MuiTextField
                  {...params}
                  label="Client"
                  size="small"
                  required
                  fullWidth
                  margin="dense"
                />
              )}
            />
            <Field
              component={Autocomplete}
              disablePortal
              disabled={loading}
              fullWidth
              name="warehouse"
              getOptionLabel={(option) =>
                option.name ? `${option.name} - ${option.description}` : ""
              }
              options={data.warehouses}
              renderInput={(params) => (
                <MuiTextField
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

            <Field
              component={Autocomplete}
              disablePortal
              disabled={loading}
              fullWidth
              name="supplier"
              getOptionLabel={(option) =>
                option.name ? `${option.name} - ${option.description}` : ""
              }
              options={data.suppliers}
              renderInput={(params) => (
                <MuiTextField
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

            <Field
              component={TextField}
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
              disabled={loading}
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

export default InboundDeliveryForm;
