import React, { useEffect } from "react";

import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  Typography,
  TextField as MuiTextField,
} from "@mui/material";

import { Autocomplete, TextField } from "formik-mui";
import { useState } from "react";
import useResource from "@/Hooks/useResource";
import ProductListForm from "./Shared/ProductListForm";

const OutboundDeliveryForm = ({ id, data = {}, onFinish, onCancel }) => {
  const [loading, setLoading] = useState(id > 0);
  const [initialValues, setInitialValues] = useState({
    outboundNo: "",
    deliveryDate: "",
    client: {},
    products: [{}],
    origin: {},
    destination: {},
  });

  const resource = useResource("outbound.delivery");

  useEffect(() => {
    const fetchData = async () => {
      const res = await resource.findById(id);
      setInitialValues({ ...initialValues, ...res.data.outbound });

      setLoading(res.data.outbound.status != "OPEN");
    };
    if (id > 0) {
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (values) => {
    const data = {
      deliveryDate: values.deliveryDate,
      client: values.client.id,
      origin: values.origin.id,
      destination: values.destination.id,
      products: values.products.map((product) => ({
        id: product.id || product.product_id,
        quantity: product.quantity,
        price: product.price,
        outbound_delivery_id: product.outbound_delivery_id,
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
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <Field
              component={TextField}
              name="outboundNo"
              label="Out. No"
              size="small"
              fullWidth
              margin="dense"
              type="text"
              disabled
            />
            <Field
              name="client"
              component={Autocomplete}
              getOptionLabel={(option) =>
                option.name ? `${option.name} - ${option.description}` : ""
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={data.clients}
              disabled={loading}
              renderInput={(params) => (
                <MuiTextField
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
            <Field
              name="origin"
              component={Autocomplete}
              getOptionLabel={(option) =>
                option.name ? `${option.name} - ${option.description}` : ""
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={data.warehouses}
              disabled={loading}
              renderInput={(params) => (
                <MuiTextField
                  {...params}
                  label="Origin"
                  size="small"
                  required
                  fullWidth
                  name="origin"
                  margin="dense"
                />
              )}
            />

            <Field
              name="destination"
              component={Autocomplete}
              getOptionLabel={(option) =>
                option.name ? `${option.name} - ${option.description}` : ""
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={data.customers}
              disabled={loading}
              renderInput={(params) => (
                <MuiTextField
                  {...params}
                  label="Destination"
                  size="small"
                  required
                  fullWidth
                  name="destination"
                  margin="dense"
                />
              )}
            />

            <Field
              component={TextField}
              name="deliveryDate"
              label="Delv. Date"
              size="small"
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

export default OutboundDeliveryForm;
