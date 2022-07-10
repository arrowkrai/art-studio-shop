import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUser } from "../actions/userActions";
import { Box, Button, Checkbox, Container, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import Title from "../components/Title";

const UserEditPage = ({ id }) => {
  const userId = id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, navigate, userId, user, successUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <Box sx={{ minHeight: "calc(100vh - 128px)", py: 4, px: 1, mt: 0, backgroundColor: "#171717", color: "grey.100" }}>
      <Title title="User Edit" />
      <Container maxWidth="sm">
        <Link to="/admin/userlist" style={{ textDecoration: "none" }}>
          <Box sx={{ display: "flex" }}>
            <ArrowBackIcon sx={{ color: "grey.100", mr: 1 }} />
            <Typography sx={{ color: "grey.100" }}>Go Back</Typography>
          </Box>
        </Link>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger" text={errorUpdate} />}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="error" text={error} />
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ my: 2 }}>
              Edit Users
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
            <Checkbox
              sx={{ color: "white" }}
              id="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            <Typography variant="span">Is Admin</Typography>

            <Button type="submit" fullWidth variant="contained" sx={{ my: 1, textTransform: "none" }}>
              Update
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default UserEditPage;
