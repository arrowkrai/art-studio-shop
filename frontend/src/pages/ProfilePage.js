import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, TextField, Typography } from "@mui/material";

const ProfilePage = ({ search }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, dispatch, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Box sx={{ minHeight: "calc(100vh - 128px)", py: 4, px: 1, mt: 0, backgroundColor: "#171717", color: "grey.100" }}>
      <Container maxWidth="xl">
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
        {success && (
          <Message
            variant="success"
            children={
              <Typography variant="p" sx={{ fontWeight: 500 }}>
                Profile Updated
              </Typography>
            }
          />
        )}
        {loading && <Loader />}

        <Grid container>
          <Grid item md={3}>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <Typography variant="h3">Update Profile</Typography>
              <TextField sx={{ backgroundColor: "grey.500" }} required fullWidth id="name" label="Name" name="name" autoFocus value={name} onChange={(e) => setName(e.target.value)} />
              <TextField sx={{ backgroundColor: "grey.500" }} required fullWidth id="email" label="Email Address" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField sx={{ backgroundColor: "grey.500" }} required fullWidth name="password" label="Password" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <TextField sx={{ backgroundColor: "grey.500" }} required fullWidth name="confirmPassword" label="Confirm Password" type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Update
              </Button>
            </Box>
          </Grid>

          <Grid item md={9}>
            <Typography variant="h3">My Orders</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilePage;
