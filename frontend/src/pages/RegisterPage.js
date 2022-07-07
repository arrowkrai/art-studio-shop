import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register } from "../actions/userActions";
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, TextField, Typography } from "@mui/material";

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
      <Container maxWidth="sm">
        {message && (
          <Message
            variant="error"
            children={
              <Typography variant="p" sx={{ fontWeight: 500 }}>
                {message}
              </Typography>
            }
          />
        )}
        {error && (
          <Message
            variant="error"
            children={
              <Typography variant="p" sx={{ fontWeight: 500 }}>
                {error}
              </Typography>
            }
          />
        )}
        {loading && <Loader />}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField sx={{ backgroundColor: "grey.500" }} required fullWidth id="name" label="Name" name="name" autoFocus value={name} onChange={(e) => setName(e.target.value)} />
          <TextField sx={{ backgroundColor: "grey.500" }} required fullWidth id="email" label="Email Address" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField sx={{ backgroundColor: "grey.500" }} required fullWidth name="password" label="Password" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <TextField sx={{ backgroundColor: "grey.500" }} required fullWidth name="confirmPassword" label="Confirm Password" type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
          <Grid container>
            <Grid item>
              <Link to={redirect ? `/register?redirect=${redirect}` : "/register"} variant="body2">
                {"Already have an account? Login"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterPage;
