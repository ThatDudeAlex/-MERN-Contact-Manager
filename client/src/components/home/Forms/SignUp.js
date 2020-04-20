import React, { useState } from "react";

// Material-UI Components
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";

// Material-UI Icons
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

// Custom Components
import FormHeader from "./FormHeader";

// API calls
import { registerUser } from "../../../apis/usersApi";

// Hooks
import { useForm } from "../../hooks/useForm";

// Styles
import { useStyles } from "./styles";

// User registration form
export default function SignUp({ handleStandardForms }) {
  const classes = useStyles();

  // Initial form state
  const [values, handleChange] = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Initial Error msg state
  const [errorMsgs, setErrMsgs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // executes when form is submitted
  const onSubmitRegister = async (event) => {
    event.preventDefault();

    const user = await registerUser(values, handleErrState);
    if (user) handleStandardForms();
  };

  // controls the setting of error messages
  const handleErrState = (state) => {
    setErrMsgs(state);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* ---under construcion --- avatar doesnt align horizrontally */}
        {/* <FormHeader formName="Sign Up" /> */}

        <Typography component="h1" variant="h4">
          Contact Manager
        </Typography>

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        {/* SignIn Form */}
        <form className={classes.form} onSubmit={onSubmitRegister} noValidate>
          <Grid container spacing={2}>
            {/* Users First Name Input */}
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                error={errorMsgs.firstName.length === 0 ? false : true}
                helperText={errorMsgs.firstName}
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={handleChange}
                autoFocus
              />
            </Grid>

            {/* Users Last Name Input */}
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                error={errorMsgs.lastName.length === 0 ? false : true}
                helperText={errorMsgs.lastName}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>

            {/* Users Email input */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                error={errorMsgs.email.length === 0 ? false : true}
                helperText={errorMsgs.email}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>

            {/* Users Password input */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                error={errorMsgs.password.length === 0 ? false : true}
                helperText={errorMsgs.password}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>

            {/* Users Confirm Password input */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                error={errorMsgs.confirmPassword.length === 0 ? false : true}
                helperText={errorMsgs.confirmPassword}
                name="confirmPassword"
                label="confirm Password"
                type="password"
                id="confirm-password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          {/* Register Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>

          {/* Toggle SignIn Form */}
          <Grid container justify="flex-end">
            <Grid item>
              <Button color="primary" className={classes.linkButton} onClick={handleStandardForms}>
                Already have an account? Sign in
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
