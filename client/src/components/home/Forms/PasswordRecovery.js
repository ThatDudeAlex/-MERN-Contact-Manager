import React, { useState } from "react";

// Material-UI Components
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  Collapse,
} from "@material-ui/core";

// Material-UI Icons
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

// API calls
import {
  passwordRecoveryEmail,
  verifyRecoveryCode,
  recoverPassword,
} from "../../../apis/usersApi";

// Hooks
import { useForm } from "../../hooks/useForm";

// Styles
import { useStyles } from "./styles";

// User password recovery form
export default function PasswordRecovery({ handleRecoveryForm }) {
  const classes = useStyles();

  // Initial form values state
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
  // Initial Error Message States
  const [errorMsgs, setErrMessages] = useState({
    email: "",
    token: "",
    password: "",
    confirmPassword: "",
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

  // Sets email related errors
  const handleEmailErr = (err) => {
    setErrMessages({ ...errorMsgs, email: err });
  };

  // Sets token related errors
  const handleTokenErr = (err) => {
    setErrMessages({ ...errorMsgs, token: err });
  };

  // Sets password & confirm password errors
  const handlePasswordErr = (err) => {
    setErrMessages({
      ...errorMsgs,
      password: err.password,
      confirmPassword: err.confirmPassword,
    });
  };

  // Receives user email input
  const onSubmitEmail = async (event) => {
    event.preventDefault();

    // Api call
    const success = await passwordRecoveryEmail(formValues, handleEmailErr);
    if (success) handletokenVisibility();
  };

  // Receives user recovery token input
  const onSubmitToken = async (event) => {
    event.preventDefault();

    // Api call
    const success = await verifyRecoveryCode(formValues, handleTokenErr);
    if (success) handlePasswordVisibility();
  };

  // Receives users updated account password
  const onSubmitPassword = async (event) => {
    event.preventDefault();

    // Api call
    const response = await recoverPassword(formValues, handlePasswordErr);
    if (response) {
      alert("Your password has been updated");
      handleRecoveryForm();
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

        {/* Recovery Email Form */}
        <Collapse in={showInputs.email} className={classes.form}>
          <form onSubmit={onSubmitEmail} noValidate>
            {/* Email Input */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              error={errorMsgs.email.length === 0 ? false : true}
              helperText={errorMsgs.email}
              fullWidth
              id="email"
              label="Please enter your email to search for your account"
              name="email"
              autoComplete="email"
              onChange={setFormValues}
              autoFocus
            />  

            {/* Submit Button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Search
            </Button>
          </form>
        </Collapse>

        {/* Recovery Token Form */}
        <Collapse in={showInputs.token} className={classes.form}>
          <form onSubmit={onSubmitToken} noValidate>
            {/* Token Input */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              error={errorMsgs.token.length === 0 ? false : true}
              helperText={errorMsgs.token}
              fullWidth
              id="token"
              label="Enter Password Recovery token"
              name="token"
              onChange={setFormValues}
              autoFocus
            />

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </Collapse>

        {/* Change Password Form */}
        <Collapse in={showInputs.password} className={classes.form}>
          <form onSubmit={onSubmitPassword} noValidate>
            {/* Password Input */}
            <TextField
              variant="outlined"
              margin="normal"
              type="password"
              required
              error={errorMsgs.password.length === 0 ? false : true}
              helperText={errorMsgs.password}
              fullWidth
              id="password"
              label="Enter New Password"
              name="password"
              onChange={setFormValues}
              autoFocus
            />

            {/* Confirm Password Input */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={errorMsgs.confirmPassword.length === 0 ? false : true}
              helperText={errorMsgs.confirmPassword}
              type="password"
              id="confirmPassword"
              label="Confirm New Password"
              name="confirmPassword"
              onChange={setFormValues}
              autoFocus
            />

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Update Password
            </Button>
          </form>
        </Collapse>
      </div>

      {/* Toggle SignIn form */}
      <Button color="primary" className={classes.linkButton} onClick={handleRecoveryForm}>
        Return to SignIn
      </Button>
    </Container>
  );
}
