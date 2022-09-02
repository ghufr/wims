import React, { useEffect } from "react";

import { Formik, Form } from "formik";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import useResource from "@/Hooks/useResource";

const CustomerForm = ({ id, onFinish, onCancel }) => {
  const [loading, setLoading] = useState(id > 0);
  const [initialValues, setInitialValues] = useState({
    name: "",
    password: "",
    role: "",
    email: "",
  });

  const resource = useResource("master.users");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await resource.findById(id);
      const role = data.user.roles[0].name;
      setInitialValues({ ...initialValues, ...data.user, role });
      setLoading(false);
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (values) => {
    if (id) {
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
              value={values.email}
              onChange={handleChange}
              name="email"
              label="Email"
              variant="standard"
              error={errors.email}
              helperText={errors.email}
              autoFocus
              fullWidth
              type="email"
              margin="normal"
              disabled={loading}
              required
            />
            <TextField
              value={values.password}
              onChange={handleChange}
              name="password"
              label="Password"
              // placeholder={id > 0 ? "(Unchanged)" : ""}
              variant="standard"
              error={errors.password}
              helperText={errors.password}
              autoFocus
              fullWidth
              margin="normal"
              disabled={loading}
            />
            <FormControl variant="standard" margin="normal" fullWidth required>
              <InputLabel id="label-select-role">Role</InputLabel>
              <Select
                labelId="label-select-role"
                id="select-role"
                name="role"
                value={values.role}
                onChange={handleChange}
                disabled={loading}
              >
                <MenuItem value="super-admin">Admin</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="staff">Staff</MenuItem>
              </Select>
            </FormControl>
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
                loading={isSubmitting}
                disabled={loading}
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

export default CustomerForm;
