import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers } from "../actions/userActions";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";


const UserListPage = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    
  }

  return (
    <Box>
      <Typography variant="h4">Users</Typography>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message
          variant="error"
          children={
            <Typography variant="p" sx={{ fontWeight: 500 }}>
              {error}
            </Typography>
          }
        />
      ) : (
        <TableContainer>
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
                    <Link to={`/user/${user._id}/edit`}>
                      <Button>Edit</Button>
                    </Link>
                    <Button color="error" onClick={() => handleDelete(user._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default UserListPage;
