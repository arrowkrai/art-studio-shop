import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register } from "../actions/userActions";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import Title from "../components/Title";

const RegisterPage = ({ search }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  console.log(userRegister);

  const redirect = search ? search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <Box sx={{ minHeight: "calc(100vh - 128px)", py: 4, px: 1, mt: 0, backgroundColor: "#171717", color: "grey.100" }}>
      <Title title="Register" />
      <Container maxWidth="sm">
        {message && <Message variant="error" text={message} />}
        {error && <Message variant="error" text={error} />}
        {loading && <Loader />}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Typography variant="h4" sx={{ my: 2, textAlign: "center" }}>
            Register
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
            id="name"
            label="Name"
            name="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ my: 1, textTransform: "none" }}>
            Register
          </Button>

          <Link to="/login" style={{ textDecoration: "none" }}>
            <Typography sx={{ color: blue[400], "&:hover": { textDecoration: "underline" } }}>
              Already have an account? Login
            </Typography>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterPage;
