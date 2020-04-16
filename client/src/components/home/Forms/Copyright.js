import React from "react";

// Material-UI
import { Link, Typography } from "@material-ui/core";

// copyright footer with current year
export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link target="_blank" color="inherit" href="https://alexjnunez.com/">
        Alex Nunez
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
