import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Switch, Redirect } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        SINFonia
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { login: false };
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const user = evt.target.querySelector("div:nth-child(1) > div > input")
      .value;
    const pass = evt.target.querySelector("div:nth-child(2) > div > input")
      .value;
    if (user === "sinfonia" && pass === "sinf") {
      localStorage.setItem("loggedIn", true);
      this.setState({ login: true });
    }
  }

  render() {
    const classes = makeStyles(theme => ({
      paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
      },
      form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
      },
      submit: {
        margin: theme.spacing(3, 0, 2)
      }
    }));

    return (
      <>
        {localStorage.getItem("loggedIn") === "true" ? (
          <Switch>
            <Redirect to="/" />
          </Switch>
        ) : (
          <>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form
                  className={classes.form}
                  noValidate
                  onSubmit={this.handleSubmit}
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Username"
                    name="email"
                    autoComplete="email"
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
                    autoComplete="current-password"
                  />
                  {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                </form>
              </div>
              <Box mt={8}>
                <Copyright />
              </Box>
            </Container>
          </>
        )}
      </>
    );
  }
}
export default Login;
