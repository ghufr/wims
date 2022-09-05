import React, { useEffect } from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import {
  TextField,
  Container,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

export default function Login() {
  const { data, setData, post, errors, reset, processing, clearErrors } =
    useForm({
      email: "",
      password: "",
      remember: "",
    });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();
    // await axios.get("/sanctum/csrf-cookie");
    // const res = await axios
    //   .post(route("api.auth.login"), data, { withCredentials: true })
    //   .then((res) => res.data)
    //   .catch(() => null);

    // if (!res) {
    //   setError("email", "These credentials do not match our records.");
    //   return;
    // }

    // window.localStorage.setItem("uhuyy", res.token);

    post(route("login"));
  };

  return (
    <Grid alignItems="center" display="flex" minHeight="100vh">
      <Head title="Log in" />
      <Container component="main" maxWidth="xs">
        <Paper variant="outlined">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              px: 4,
              py: 3,
            }}
          >
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 3 }}
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="email"
                    id="email"
                    label="Email"
                    autoComplete="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    error={errors.email != null}
                    helperText={errors.email}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    error={errors.password != null}
                    helperText={errors.password}
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value={data.remember} color="primary" />}
                    label="Remember me"
                    onChange={(e) => setData("remember", e.target.checked)}
                  />
                </Grid>
              </Grid>

              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={processing}
                size="large"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Grid>
  );
}
