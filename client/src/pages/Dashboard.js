import React from "react";

// Material-UI Components
import { Grid, CssBaseline } from "@material-ui/core";

// Custom Components
import Header from "../components/dashboard/header/Header";
import Contacts from "../components/dashboard/contacts/Contacts";
import WithContext from "../components/context";

// wraps header component in HOC containing global app state/functions
const HeaderWithContext = WithContext(Header);

export default function Dashboard() {
  return (
    <Grid container component="main">
      <CssBaseline />
      <HeaderWithContext />
      <Contacts />
    </Grid>
  );
}
