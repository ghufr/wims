import React, { useEffect } from "react";

import { Formik, Form } from "formik";
import {
  Box,
  Button,
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import useResource from "@/Hooks/useResource";

const VendorForm = ({ id, onFinish, onCancel }) => {
  const [loading, setLoading] = useState(id > 0);
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    address: "",
    address2: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const resource = useResource("master.vendors");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await resource.findById(id);
      setInitialValues({ ...initialValues, ...data.vendor });
      setLoading(false);
    };
    if (id > 0) {
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (values) => {
    if (id > 0) {
      await resource.update(id, values);
    } else {
      await resource.create(values);
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
        {({ values, errors, handleChange, isSubmitting }) => (
          <Form>
            <TextField
              value={values.name}
              onChange={handleChange}
              name="name"
              label="Name"
              variant="standard"
              error={errors.name}
              helperText={errors.name}
              autoFocus
              fullWidth
              margin="normal"
              disabled={loading}
              required
            />
            <TextField
              value={values.description}
              onChange={handleChange}
              name="description"
              label="Description"
              variant="standard"
              error={errors.description}
              helperText={errors.description}
              autoFocus
              fullWidth
              margin="normal"
              disabled={loading}
            />
            <TextField
              value={values.address}
              onChange={handleChange}
              name="address"
              label="Address"
              variant="standard"
              error={errors.address}
              helperText={errors.address}
              autoFocus
              fullWidth
              margin="normal"
              disabled={loading}
            />
            <TextField
              value={values.address2}
              onChange={handleChange}
              name="address2"
              label="Address 2"
              variant="standard"
              error={errors.address2}
              helperText={errors.address2}
              autoFocus
              fullWidth
              margin="normal"
              disabled={loading}
            />

            <TextField
              value={values.city}
              onChange={handleChange}
              name="city"
              label="City"
              variant="standard"
              error={errors.city}
              helperText={errors.city}
              autoFocus
              fullWidth
              margin="normal"
              disabled={loading}
            />

            <TextField
              value={values.postalCode}
              onChange={handleChange}
              name="postalCode"
              label="Postal Code"
              variant="standard"
              error={errors.postalCode}
              helperText={errors.postalCode}
              autoFocus
              fullWidth
              margin="normal"
              disabled={loading}
            />

            <TextField
              value={values.phone}
              onChange={handleChange}
              name="phone"
              label="Phone"
              variant="standard"
              error={errors.phone}
              helperText={errors.phone}
              autoFocus
              fullWidth
              type="tel"
              margin="normal"
              disabled={loading}
            />

            {/* <FormControl variant="standard" margin="normal" fullWidth required>
              <InputLabel id="label-select-type">Type</InputLabel>
              <Select
                labelId="label-select-type"
                id="select-type"
                name="type"
                value={values.type}
                onChange={handleChange}
                disabled={loading}
              >
                <MenuItem value="Frozen">Frozen</MenuItem>
                <MenuItem value="Live">Live</MenuItem>
                <MenuItem value="Fresh">Fresh</MenuItem>
                <MenuItem value="Mati">Mati</MenuItem>
              </Select>
            </FormControl> */}

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

export default VendorForm;
