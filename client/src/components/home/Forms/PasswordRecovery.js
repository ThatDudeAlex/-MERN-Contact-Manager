import React, { useState } from "react";

// Material-UI
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  Typography,
  Container,
  Collapse,
} from "@material-ui/core";

// Icons
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

// Components
import Copyright from "./Copyright";

// API calls
import { passwordRecoveryEmail, verifyRecoveryCode, recoverPassword } from "../../../apis/usersApi";

// Hooks
import { useForm } from "../../hooks/useForm";

// Styles
import { useStyles } from "./styles";

// User password recovery form
export default function PasswordRecovery({ handlePasswordRecovery }) {
  const classes = useStyles();

  // Initial form value states
  const [formValues, setFormValues] = useForm({
    email: "",
    token: "",
    password: "",
    confirmPassword: "",
  });
  // Initial form visibility states
  const [showInputs, setVisibility] = useState({
    email: true,
    token: false,
    password: false,
  });

  // Hides email form & displays token form
  const handletokenVisibility = () => {
    setVisibility({
      ...showInputs,
      token: !showInputs.token,
      email: !showInputs.email,
    });
  };

  // Hides token form & displays new password form
  const handlePasswordVisibility = () => {
    setVisibility({
      ...showInputs,
      password: !showInputs.password,
      token: !showInputs.token,
    });
  };

  // receives user email input
  const onSubmitEmail = async (event) => {
    event.preventDefault();

    // Api call
    const response = await passwordRecoveryEmail(formValues);

    if (response.success) 
      handletokenVisibility();
  };

  // receives user recovery token input
  const onSubmitToken = async (event) => {
    event.preventDefault();
    
    // Api call
    const response = await verifyRecoveryCode(formValues);
    
    if (response.success) 
      handlePasswordVisibility()
  };

  // receives users updated account password
  const onSubmitPassword = async (event) => {
    event.preventDefault();

    // Api call
    const response = await recoverPassword(formValues);

    if (response.success) {
      alert("Your password has been updated")
      handlePasswordRecovery()
    }
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Contact Manager
        </Typography>

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Password Recovery
        </Typography>

        <form className={classes.form} onSubmit={onSubmitPassword} noValidate>
          {/* Users Email Input */}
          <Collapse in={showInputs.email}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Please enter your email to search for your account"
              name="email"
              autoComplete="email"
              onChange={setFormValues}
              autoFocus
            />

            <Button
              fullWidth
              onClick={onSubmitEmail}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Search
            </Button>
          </Collapse>

          {/* Users Recovery Token Input */}
          <Collapse in={showInputs.token}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="token"
              label="Enter Password Recovery token"
              name="token"
              onChange={setFormValues}
              autoFocus
            />

            <Button
              onClick={onSubmitToken}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </Collapse>

          {/* Users New Password Input */}
          <Collapse in={showInputs.password}>
            <TextField
              variant="outlined"
              margin="normal"
              type="password"
              required
              fullWidth
              id="password"
              label="Enter New Password"
              name="password"
              onChange={setFormValues}
              autoFocus
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="password"
              id="confirmPassword"
              label="Confirm New Password"
              name="confirmPassword"
              onChange={setFormValues}
              autoFocus
            />

            <Button
              onClick={onSubmitPassword}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Update Password 
            </Button>
          </Collapse>

          {/* Returns to login form */}
          <Link href="#" variant="body2" onClick={handlePasswordRecovery}>
            return to sign in form
          </Link>
        </form>
      </div>

      {/* Copyright */}
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
