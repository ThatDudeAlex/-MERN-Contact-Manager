import React from "react";

// Material-UI Components
import { Avatar, Typography, Grid } from "@material-ui/core";

// Material-UI Icons
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

// Styles
import { useStyles } from "./styles";

// copyright footer with current year
export default function FormHeader({formName}) {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Typography component="h1" variant="h4">
        Contact Manager
      </Typography>
        
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
    
      <Typography component="h1" variant="h5">
        {formName}
      </Typography>
    </Grid>
  );
}
