import React, { useEffect } from "react";

import { Formik, Form } from "formik";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import useResource from "@/Hooks/useResource";

const ProductForm = ({ id, onFinish, onCancel }) => {
  const [loading, setLoading] = useState(id > 0);
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    baseEan: "",
    baseUom: "Kg",
    section: "FAST",
    type: "Frozen",
    lifespan: 60,
  });

  const resource = useResource("master.products");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await resource.findById(id);
      setInitialValues({ ...initialValues, ...data.product });
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
              value={values.baseEan}
              onChange={handleChange}
              name="baseEan"
              label="Base EAN"
              variant="standard"
              error={errors.baseEan}
              helperText={errors.baseEan}
              autoFocus
              fullWidth
              margin="normal"
              type="number"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                max: 9999999999999,
              }}
              disabled={loading}
            />

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
                <MenuItem value="Frozen">Frozen</MenuItem>
                <MenuItem value="Live">Live</MenuItem>
                <MenuItem value="Fresh">Fresh</MenuItem>
                <MenuItem value="Mati">Mati</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="standard" margin="normal" fullWidth required>
              <InputLabel id="label-select-baseUom">Base UOM</InputLabel>
              <Select
                labelId="label-select-baseUom"
                id="select-baseUom"
                name="baseUom"
                value={values.baseUom}
                onChange={handleChange}
                disabled={loading}
              >
                <MenuItem value="Kg">Kg</MenuItem>
                <MenuItem value="Pcs">Pcs</MenuItem>
                <MenuItem value="gr">gr</MenuItem>
              </Select>
            </FormControl>

            <TextField
              value={values.lifespan}
              onChange={handleChange}
              name="lifespan"
              label="Lifespan (days)"
              variant="standard"
              error={errors.lifespan}
              helperText={errors.lifespan}
              autoFocus
              fullWidth
              margin="normal"
              disabled={loading}
              type="number"
              required
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

export default ProductForm;
