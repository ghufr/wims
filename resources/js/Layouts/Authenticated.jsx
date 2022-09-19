import React, { Fragment } from "react";

import {
  HiOutlineHome,
  HiOutlineArrowSmRight,
  HiChevronDown,
  HiOutlineCog,
  HiOutlineArrowSmLeft,
  HiOutlineArchive,
  HiChevronUp,
  HiLogout,
  HiOutlineLogout,
} from "react-icons/hi";
import { Head, Link, usePage } from "@inertiajs/inertia-react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  AppBar,
  Box,
  Collapse,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import Notification from "@/Components/Notification";
import { Inertia } from "@inertiajs/inertia";

const queryClient = new QueryClient();

const renderMenu = (menu, padding = 4) => {
  if (menu.children) {
    const [open, setOpen] = useState(false);
    if (menu.children.filter((sub) => sub.show) < 1) return;
    return (
      <Fragment key={menu.name + "-head"}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setOpen(!open)} dense>
            {/* <ListItemIcon> */}
            <menu.icon size={22} style={{ marginRight: 8 }} />
            {/* </ListItemIcon> */}
            <ListItemText primary={menu.name} />
            {open ? <HiChevronUp /> : <HiChevronDown />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {menu.children.map((menu) => renderMenu(menu, 4))}
          </List>
        </Collapse>
      </Fragment>
    );
  }

  if (!menu.show) return null;

  return (
    <ListItem key={menu.name} disablePadding>
      <ListItemButton
        href={menu.href && route(menu.href)}
        component={Link}
        dense
        sx={{ pl: padding || 2 }}
        selected={menu.href && route().current(menu.href)}
      >
        {menu.icon && (
          // <ListItemIcon>
          <menu.icon size={22} style={{ marginRight: 8 }} />
          // </ListItemIcon>
        )}

        <ListItemText primary={menu.name} />
      </ListItemButton>
    </ListItem>
  );
};

export default function Authenticated({ title = "", description, children }) {
  const { props } = usePage();

  console.log(props);

  function can(permission) {
    return props.can[permission] != null;
  }

  const menus = [
    {
      name: "Dashboard",
      href: "dashboard",
      icon: HiOutlineHome,
      show: true,
    },
    {
      name: "Inbound",
      icon: HiOutlineArrowSmRight,
      children: [
        {
          name: "Inbound Delivery",
          href: "inbound.delivery.index",
          show: can("viewAll_InboundDelivery"),
        },
        {
          name: "Goods Receiving",
          href: "inbound.receipt.index",
          show: can("viewAll_GoodsReceipt"),
        },
      ],
    },
    {
      name: "Inventory",
      icon: HiOutlineArchive,
      children: [
        {
          name: "Inventory List",
          href: "inventory.list.index",
          show: can("viewAll_Inventory"),
        },
      ],
    },
    {
      name: "Outbound",
      icon: HiOutlineArrowSmLeft,
      children: [
        {
          name: "Outbound Delivery",
          href: "outbound.delivery.index",
          show: can("viewAll_OutboundDelivery"),
        },
        {
          name: "Delivery Order",
          href: "outbound.order.index",
          show: can("viewAll_DeliveryOrder"),
        },
      ],
    },
    {
      name: "Master Data",
      icon: HiOutlineCog,
      children: [
        {
          name: "Products",
          href: "master.products.index",
          show: can("viewAll_Product"),
        },
        {
          name: "Warehouses",
          href: "master.warehouses.index",
          show: can("viewAll_Warehouse"),
        },
        {
          name: "Locations",
          href: "master.locations.index",
          show: can("viewAll_Location"),
        },
        {
          name: "Vendors",
          href: "master.vendors.index",
          show: can("viewAll_Vendor"),
        },
        {
          name: "Customers",
          href: "master.customers.index",
          show: can("viewAll_Customer"),
        },
        {
          name: "Users",
          href: "master.users.index",
          show: can("viewAll_User"),
        },
      ],
    },
  ];

  const drawerWidth = 240;

  const handleLogout = () => {
    Inertia.post(route("logout"));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar variant="dense">
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" noWrap component="div">
              {title}
            </Typography>
            <p>{description || " "}</p>
          </Box>
          <Typography variant="body1" component="div">
            {props.auth.user.name}
          </Typography>
          <IconButton variant="outlined" color="error" onClick={handleLogout}>
            <HiOutlineLogout />
          </IconButton>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Head>
          <title>{title}</title>
        </Head>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="permanent"
            component="nav"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            anchor="left"
          >
            <Toolbar variant="dense"></Toolbar>

            <List>{menus.map(renderMenu)}</List>
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar variant="dense" />
          {children}
        </Box>
      </Box>
      <Notification messages={props.errors} />
    </QueryClientProvider>
  );
}
