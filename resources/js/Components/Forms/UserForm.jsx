import React, { useEffect } from "react";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
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
    if (id > 0) {
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (values) => {
    if (id > 0) {
      if (values.password.length == 0) {
        delete values.password;
      }
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
            <Field
              component={TextField}
              name="name"
              label="Name"
              variant="standard"
              helperText={errors.name}
              autoFocus
              fullWidth
              margin="normal"
              disabled={loading}
              required
            />
            <Field
              component={TextField}
              name="email"
              label="Email"
              variant="standard"
              helperText={errors.email}
              fullWidth
              type="email"
              margin="normal"
              disabled={loading}
              required
            />
            <Field
              component={TextField}
              name="password"
              label="Password"
              type="password"
              // placeholder={id > 0 ? "(Unchanged)" : ""}
              variant="standard"
              helperText={errors.password}
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

export default CustomerForm;
