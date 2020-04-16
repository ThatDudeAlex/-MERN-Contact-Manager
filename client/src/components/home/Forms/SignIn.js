import React from "react";
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

// API calls
import { loginUser } from "../../../apis/usersApi";

// Hooks
import { useForm } from "./hooks/useForm";

// Styles
import { useStyles } from "./styles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Alex Nunez
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn({ handleFormType, context }) {
  const classes = useStyles();
  const history = useHistory();
  const [formValues, setFormValues] = useForm({ email: "", password: "" });

  const onSubmitLogin = async (event) => {
    event.preventDefault();

    const loginStatus = await loginUser(formValues);
    console.log(loginStatus)
    if (loginStatus.success) {
      context.actions.handleLogin();
      history.push(`/dashboard`);
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
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={onSubmitLogin} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
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
              <Link href="#" variant="body2">
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
