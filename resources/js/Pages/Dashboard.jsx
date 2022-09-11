import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import {
  Autocomplete,
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
// import Table from "@/Components/Table";

const Dashboard = ({ can, inOutQty, inventoryValues, ...props }) => {
  const rows = [
    {
      name: "Hello",
      quantity: 99,
      baseUom: "Kg",
      lifespan: "31-60",
    },
  ];

  const dataInboundQty = [
    { name: "Unreceived", value: props.inboundQty.OPEN, color: "#f50057" },
    {
      name: "Waiting Putaway",
      value: props.inboundQty.PROCESS,
      color: "#ff9800",
    },
    { name: "On Putaway", value: props.inboundQty.CLOSE, color: "#4caf50" },
  ];

  const dataOutboundQty = [
    { name: "Unreceived", value: props.outboundQty.OPEN, color: "#f50057" },
    {
      name: "Waiting Putaway",
      value: props.outboundQty.PROCESS,
      color: "#ff9800",
    },
    { name: "On Putaway", value: props.outboundQty.CLOSE, color: "#4caf50" },
  ];

  const warehouses = [{ label: "Hello", value: "World" }];
  // const data = Array(7)
  //   .fill(0)
  //   .map((_, i) => ({
  //     date: `${i + 1}-Jan-2022`,
  //     quantity: 1000 * (i + 1),
  //   }));
  return (
    <div>
      <Head title="Dashboard" />
      <div>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Autocomplete
            disablePortal
            id="warehouse-filter"
            options={warehouses}
            sx={{ width: 300, mb: 2 }}
            renderInput={(params) => (
              <TextField {...params} label="Warehouse (All)" />
            )}
          />
          <Autocomplete
            disablePortal
            id="client-filter"
            options={warehouses}
            sx={{ width: 300, mb: 2 }}
            renderInput={(params) => (
              <TextField {...params} label="Client (All)" />
            )}
          />
        </Box>

        {/* <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">5</Typography>
            <Typography>Open Inbound</Typography>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">3</Typography>
            <Typography>Open Outbound</Typography>
          </Paper>
        </Box> */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Box textAlign={"center"}>
                <Typography variant="subtitle2">Outstanding Inbound</Typography>
                <Typography variant="caption">by Quantity</Typography>
              </Box>
              <ResponsiveContainer height={320}>
                <PieChart width={"100%"} height={"100%"}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={dataInboundQty}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {dataInboundQty.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  {/* <Pie
                    dataKey="value"
                    data={data01}
                    cx={500}
                    cy={200}
                    innerRadius={40}
                    outerRadius={80}
                    fill="#82ca9d"
                  /> */}
                  <Legend dy={24} wrapperStyle={{ fontSize: "11px" }} />

                  {/* <Tooltip /> */}
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Box textAlign={"center"}>
                <Typography variant="subtitle2">
                  Outstanding Outbound
                </Typography>
                <Typography variant="caption">by Quantity</Typography>
              </Box>
              <ResponsiveContainer height={320}>
                <PieChart width={"100%"} height={"100%"}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={dataOutboundQty}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {dataOutboundQty.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  {/* <Pie
                    dataKey="value"
                    data={data01}
                    cx={500}
                    cy={200}
                    innerRadius={40}
                    outerRadius={80}
                    fill="#82ca9d"
                  /> */}
                  <Legend dy={24} wrapperStyle={{ fontSize: "11px" }} />

                  {/* <Tooltip /> */}
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Box textAlign={"center"}>
                <Typography variant="subtitle2">IM Inventory</Typography>
                <Typography variant="caption">
                  Stock Level by Posting Date
                </Typography>
              </Box>

              <ResponsiveContainer height={320}>
                <BarChart data={inventoryValues}>
                  <CartesianGrid />
                  <XAxis
                    dataKey="posting_date"
                    angle={-20}
                    dx={-18}
                    dy={8}
                    interval={0}
                    fontSize={11}
                  ></XAxis>
                  <YAxis
                    label={{
                      value: "Quantity",
                      angle: -90,
                      position: "insideLeft",
                      fontSize: 11,
                    }}
                    fontSize={11}
                  />
                  <Tooltip />
                  <Legend dy={24} wrapperStyle={{ fontSize: "11px" }} />
                  <Bar
                    dataKey="quantity"
                    fill="#2979ff"
                    name="Stock Level"
                    label={false}
                  ></Bar>
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Box textAlign={"center"}>
                <Typography variant="subtitle2">
                  Warehouse Throughput
                </Typography>
                <Typography variant="caption">
                  Inbound and Outbound by Quantity
                </Typography>
              </Box>

              <ResponsiveContainer height={320}>
                <BarChart data={inOutQty}>
                  <CartesianGrid />
                  <XAxis
                    dataKey="posting_date"
                    angle={-20}
                    dx={-18}
                    dy={8}
                    interval={0}
                    fontSize={11}
                  ></XAxis>
                  <YAxis
                    label={{
                      value: "Quantity",
                      angle: -90,
                      position: "insideLeft",
                      fontSize: 11,
                    }}
                    fontSize={11}
                  />
                  <Tooltip />
                  <Legend dy={24} wrapperStyle={{ fontSize: "11px" }} />
                  <Bar
                    dataKey="inbound"
                    fill="#2979ff"
                    name="Inbound"
                    label={false}
                  ></Bar>
                  <Bar
                    dataKey="outbound"
                    fill="#f50057"
                    name="Outbound"
                    label={false}
                  ></Bar>
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 1 }}>
              <Box textAlign={"center"}>
                <Typography variant="subtitle2">Stock Aging</Typography>
                <Typography variant="caption">
                  by Posting Date - Top 20 items
                </Typography>
              </Box>
              <TableContainer component={Box}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Posting Date</TableCell>
                      <TableCell>Qty</TableCell>
                      <TableCell>Base Uom</TableCell>
                      <TableCell>Category</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell>{row.baseUom}</TableCell>
                        <TableCell>{row.lifespan} days</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

Dashboard.layout = (page) => {
  return <Authenticated title="Dashboard">{page}</Authenticated>;
};
export default Dashboard;
