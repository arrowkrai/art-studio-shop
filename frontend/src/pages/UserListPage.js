import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";
import { Box, Button, Container, createTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: grey[400],
          backgroundColor: grey[900],
        },
      },
    },
  },
});

const UserListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, successDelete, navigate]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id))
    }
  };

  return (
    <Box sx={{ minHeight: "calc(100vh - 128px)", py: 4, px: 1, mt: 0, backgroundColor: "#171717", color: "grey.100" }}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 3 }}>
            Users
          </Typography>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="error" text={error} />
          ) : (
            <TableContainer sx={{ border: "1px solid white" }}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">NAME</TableCell>
                    <TableCell align="right">EMAIL</TableCell>
                    <TableCell align="right">ADMIN</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {user._id}
                      </TableCell>
                      <TableCell align="right">{user.name}</TableCell>
                      <TableCell align="right">{user.email}</TableCell>
                      <TableCell align="right">{user.isAdmin ? <strong>ADMIN</strong> : "USER"}</TableCell>
                      <TableCell align="right">
                        <Link to={`/admin/user/${user._id}/edit`}>
                          <Button>Edit</Button>
                        </Link>
                        <Button color="error" onClick={() => handleDelete(user._id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Container>
      </ThemeProvider>
    </Box>
  );
};

export default UserListPage;
