import {
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { FieldArray } from "formik";
import React from "react";

const ProductListForm = ({ values, data, setFieldValue, loading }) => {
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
                    readOnly={loading}
                    required
                  /> */}
                    <Autocomplete
                      disablePortal
                      readOnly={loading}
                      fullWidth
                      size="small"
                      id="product"
                      name={`products.${index}`}
                      value={product.name || ""}
                      isOptionEqualToValue={(option, val) => option.name == val}
                      onChange={(e, nVal) => {
                        if (nVal) {
                          setFieldValue(`products.${index}`, nVal);
                          // insert(index, nVal);
                          // setFieldValue()
                        } else {
                          setFieldValue(`products.${index}`, {});
                          remove(index);
                        }
                      }}
                      inputValue={
                        product.name
                          ? `${product.name} - ${product.description}`
                          : ""
                      }
                      options={
                        data.products &&
                        data.products.map(
                          ({ name, description, baseUom, id }) => ({
                            label: `${name} - ${description}`,
                            value: name,
                            id,
                            name,
                            description,
                            baseUom,
                          })
                        )
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          // variant="standard"
                          required
                          fullWidth
                          margin="none"
                          size="small"
                        />
                      )}
                    />
                  </td>

                  <td>
                    <TextField
                      name={`products.${index}.quantity`}
                      type="number"
                      value={product.quantity || ""}
                      onChange={(e) =>
                        setFieldValue(
                          `products.${index}.quantity`,
                          parseInt(e.target.value, 10)
                        )
                      }
                      fullWidth
                      margin="none"
                      size="small"
                      readOnly={loading}
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {product.baseUom}
                          </InputAdornment>
                        ),
                      }}
                    ></TextField>
                  </td>
                  <td>
                    <TextField
                      name={`products.${index}.price`}
                      type="number"
                      value={product.price || ""}
                      onChange={(e) =>
                        setFieldValue(
                          `products.${index}.price`,
                          parseInt(e.target.value, 10)
                        )
                      }
                      // variant="standard"
                      fullWidth
                      margin="none"
                      size="small"
                      readOnly={loading}
                      required
                    ></TextField>
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
                  onClick={() =>
                    push({ name: "", description: "", quantity: "" })
                  }
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
