import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Material-UI Components
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

// Material-UI Icons
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

// Custom Components
import Copyright from "./Copyright";

// API calls
import { loginUser } from "../../../apis/usersApi";

// Hooks
import { useForm } from "../../hooks/useForm";

// Styles
import { useStyles } from "./styles";

// User login form
export default function SignIn({
  handleStandardForms,
  handleRecoveryForm,
  context,
}) {
  const classes = useStyles();
  const history = useHistory();

  // Initial state
  const [formValues, setFormValues] = useForm({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsgs, setErrMsgs] = useState({ email: "", password: "" });

  // executes when form is submitted
  const onSubmitLogin = async (event) => {
    event.preventDefault();

    const payload = { ...formValues, rememberMe };

    // Api call to log user in
    const user = await loginUser(payload, handleErrState);

    if (user) {
      context.actions.handleLogin(user);
      history.replace(`/dashboard`);
    }
  };

  // Controls remember me button state
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  // Controls error messages state
  const handleErrState = (state) => {
    setErrMsgs(state);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* Form Header */}
        <Typography component="h1" variant="h4">
          Contact Manager
        </Typography>

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {/* SignIn Form */}
        <form className={classes.form} onSubmit={onSubmitLogin} noValidate>
          {/* User Email Input */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={errorMsgs.email.length === 0 ? false : true}
            helperText={errorMsgs.email}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={setFormValues}
            autoFocus
          />

          {/* User Password Input */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={errorMsgs.password.length === 0 ? false : true}
            helperText={errorMsgs.password}
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={setFormValues}
            autoComplete="current-password"
          />

          {/* Remember Me Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                onChange={handleRememberMe}
              />
            }
            label="Remember me"
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          
          {/* Toggle Password Recovery Form */}
          <Grid container>
            <Grid item xs>
              <Button color="primary" className={classes.linkButton} onClick={handleRecoveryForm}>
                Forgot password?
              </Button>
            </Grid>
            
            {/* Toggle SignUp Form */}
            <Grid item>
              <Button color="primary" className={classes.linkButton} onClick={handleStandardForms}>
                Don't have an account? Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>

      {/* Engineer's Signature */}
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
