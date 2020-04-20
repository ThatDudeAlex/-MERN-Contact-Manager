import React from "react";

// Material-UI Components
import {CssBaseline, Paper, Grid} from "@material-ui/core"

// Styles
import { useStyles } from "./styles/home";

// Custom Components
import FormCards from "../components/home/FormCards";

export default function Home() {
  const classes = useStyles();
 
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <FormCards />
      </Grid>
    </Grid>
  );
}
