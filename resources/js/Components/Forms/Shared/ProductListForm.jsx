import {
  Box,
  Button,
  InputAdornment,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { Field, FieldArray } from "formik";
import { TextField, Autocomplete } from "formik-mui";
import React from "react";

const ProductListForm = ({ values, data, loading }) => {
  return (
    <FieldArray name="products">
      {({ remove, push }) => (
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>
                <Typography variant="caption">Name</Typography>
              </th>
              <th style={{ textAlign: "left" }}>
                <Typography variant="caption">Qty</Typography>
              </th>
              <th style={{ textAlign: "left" }}>
                <Typography variant="caption">Price</Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {values.products &&
              values.products.map((product, index) => (
                <Box key={index} as="tr">
                  <td width="40%">
                    {/* <Field
                    component={TextFieldFormik}
                    type="text"
                    name={`product.${index}.name`}
                    fullWidth
                    margin="none"
                    size="small"
                    disabled={loading}
                    required
                  /> */}
                    <Field
                      component={Autocomplete}
                      disablePortal
                      disabled={loading}
                      fullWidth
                      size="small"
                      name={`products[${index}]`}
                      getOptionLabel={(option) =>
                        option.name
                          ? `${option.name} - ${option.description}`
                          : ""
                      }
                      isOptionEqualToValue={(option, val) =>
                        option.name == val.name
                      }
                      componentsProps={{
                        clearIndicator: {
                          onClick: () => remove(index),
                        },
                      }}
                      // onChange={(e, nVal) => {
                      //   if (nVal) {
                      //     setFieldValue(`products[${index}]`, nVal);
                      //   } else {
                      //     setFieldValue(`products[${index}]`, {});
                      //     remove(index);
                      //   }
                      // }}
                      // inputValue={
                      //   product.name
                      //     ? `${product.name} - ${product.description}`
                      //     : ""
                      // }
                      options={data.products}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          // variant="standard"
                          name={`products[${index}].id`}
                          required
                          fullWidth
                          margin="none"
                          size="small"
                        />
                      )}
                    />
                  </td>

                  <td>
                    <Field
                      component={TextField}
                      name={`products[${index}].quantity`}
                      type="number"
                      fullWidth
                      margin="none"
                      size="small"
                      disabled={loading}
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {product.baseUom}
                          </InputAdornment>
                        ),
                      }}
                    ></Field>
                  </td>
                  <td>
                    <Field
                      component={TextField}
                      name={`products[${index}].price`}
                      type="number"
                      // onChange={(e) =>
                      //   setFieldValue(
                      //     `products.${index}.price`,
                      //     parseInt(e.target.value, 10)
                      //   )
                      // }
                      // variant="standard"
                      fullWidth
                      margin="none"
                      size="small"
                      disabled={loading}
                      required
                    ></Field>
                  </td>
                </Box>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => push({ id: "", quantity: "", price: "" })}
                  disabled={loading}
                >
                  Add
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </FieldArray>
  );
};

export default ProductListForm;
