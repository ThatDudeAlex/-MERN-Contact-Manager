import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Material-UI
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

// Icons
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

// Components
import Copyright from "./Copyright";

// API calls
import { loginUser } from "../../../apis/usersApi";

// Hooks
import { useForm } from "../../hooks/useForm";

// Styles
import { useStyles } from "./styles";


// User login form
export default function SignIn({
  handleFormType,
  handlePasswordRecovery,
  context,
}) {
  const classes = useStyles();
  const history = useHistory();

  // Initial state
  const [formValues, setFormValues] = useForm({ email: "", password: "" });
  const [errorMsgs, setErrMessages] = useState({ email: "", password: "" });

  // executes when form is submitted
  const onSubmitLogin = async (event) => {
    event.preventDefault();

    // Api call to log user in
    const user = await loginUser(formValues, handleErrState);

    if (user) {
      context.actions.handleLogin(user);
      history.replace(`/dashboard`);
    }
  };

  // controls the setting of error messages
  const handleErrState = (state) => {
    setErrMessages(state)
  }

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
          Sign in
        </Typography>

        <form className={classes.form} onSubmit={onSubmitLogin} noValidate>
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

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" onClick={handlePasswordRecovery}>
                Forgot password?
              </Link>
            </Grid>

            <Grid item>
              <Link href="#" variant="body2" onClick={handleFormType}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
