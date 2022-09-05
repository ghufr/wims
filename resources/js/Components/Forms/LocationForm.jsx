import React, { useEffect } from "react";

import { Formik, Form } from "formik";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useState } from "react";
import useResource from "@/Hooks/useResource";

const LocationForm = ({ id, data = {}, onFinish, onCancel }) => {
  const [loading, setLoading] = useState(id > 0);
  const [initialValues, setInitialValues] = useState({
    name: "",
    type: "",
    section: "",
    warehouse: "",
  });

  const resource = useResource("master.locations");

  useEffect(() => {
    const fetchData = async () => {
      const res = await resource.findById(id);
      setInitialValues({ ...initialValues, ...res.data.location });
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

            <FormControl variant="standard" margin="normal" fullWidth required>
              <InputLabel id="label-select-type">Type</InputLabel>
              <Select
                labelId="label-select-type"
                id="select-type"
                name="type"
                value={values.type}
                onChange={handleChange}
                disabled={loading}
              >
                <MenuItem value="PICK">PICK</MenuItem>
                <MenuItem value="BULK">BULK</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="standard" margin="normal" fullWidth required>
              <InputLabel id="label-select-section">Section</InputLabel>
              <Select
                labelId="label-select-section"
                id="select-section"
                name="section"
                value={values.section}
                onChange={handleChange}
                disabled={loading}
              >
                <MenuItem value="SLOW">SLOW</MenuItem>
                <MenuItem value="FAST">FAST</MenuItem>
              </Select>
            </FormControl>

            <Autocomplete
              disablePortal
              fullWidth
              id="warehouse"
              value={values.warehouse.name || ""}
              onChange={handleChange}
              options={
                data.warehouses &&
                data.warehouses.map(({ name, description }) => ({
                  label: `${name} - ${description}`,
                  value: name,
                }))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Warehouse"
                  variant="standard"
                  required
                  fullWidth
                  name="warehouse"
                  margin="normal"
                />
              )}
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

export default LocationForm;
