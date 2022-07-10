import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import Title from "../components/Title";
import { register } from "../actions/userActions";

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const LoginPage = ({ search }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = search ? "/" + search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const signInWithDemoAccount = (e) => {
    e.preventDefault();
    const demoNum = randomIntFromInterval(1000, 9999);
    dispatch(register("Demo Account", `demoaccount${demoNum}@example.com`, demoNum));
  };

  return (
    <Box sx={{ minHeight: "calc(100vh - 128px)", py: 4, px: 1, mt: 0, backgroundColor: "#171717", color: "grey.100" }}>
      <Title title="Login" />
      <Container maxWidth="sm">
        {error && <Message variant="error" text={error} />}
        {loading && <Loader />}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Typography variant="h4" sx={{ my: 2, textAlign: "center" }}>
            Login
          </Typography>

          <TextField
            sx={{
              my: 1,
              backgroundColor: "grey.800",
              input: { color: "grey.100" },
              ".MuiInputLabel-animated": { color: "grey.400" },
              ".MuiInputLabel-animated.Mui-focused": { color: "primary.light" },
              borderRadius: 1,
            }}
            required
            fullWidth
            autoFocus
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            sx={{
              my: 1,
              backgroundColor: "grey.800",
              input: { color: "grey.100" },
              ".MuiInputLabel-animated": { color: "grey.400" },
              ".MuiInputLabel-animated.Mui-focused": { color: "primary.light" },
              borderRadius: 1,
            }}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ my: 1, textTransform: "none" }}>
            Sign In
          </Button>

          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"} style={{ textDecoration: "none" }}>
            <Typography sx={{ color: blue[400], "&:hover": { textDecoration: "underline" } }}>
              Don't have an account? Register
            </Typography>
          </Link>
        </Box>
        <Button
          color="secondary"
          onClick={signInWithDemoAccount}
          fullWidth
          variant="contained"
          sx={{ mt: 10, textTransform: "none" }}
        >
          Sign In with Demo Account
        </Button>
      </Container>
    </Box>
  );
};

export default LoginPage;
