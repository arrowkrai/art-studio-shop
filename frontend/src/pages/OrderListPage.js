import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import {
  Box,
  Button,
  Container,
  createTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import Title from "../components/Title";

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

const OrderListPage = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <Box sx={{ minHeight: "calc(100vh - 128px)", py: 4, px: 1, mt: 0, backgroundColor: "#171717", color: "grey.100" }}>
      <Title title="Order List" />
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 3 }}>
            Orders
          </Typography>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="error" text={error} />
          ) : (
            <TableContainer sx={{ border: "1px solid white" }}>
              <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">USER</TableCell>
                    <TableCell align="right">DATE</TableCell>
                    <TableCell align="right">TOTAL</TableCell>
                    <TableCell align="right">PAID</TableCell>
                    <TableCell align="right">DELIVERED</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {order._id}
                      </TableCell>
                      <TableCell align="right">{order.user && order.user.name}</TableCell>
                      <TableCell align="right">{order.createdAt.substring(0, 10)}</TableCell>
                      <TableCell align="right">{order.totalPrice}</TableCell>
                      <TableCell align="right">
                        {order.isPaid ? order.paidAt.substring(0, 10) : <FaTimes style={{ color: "red" }} />}
                      </TableCell>
                      <TableCell align="right">
                        {order.isDelivered ? order.deliveredAt.substring(0, 10) : <FaTimes style={{ color: "red" }} />}
                      </TableCell>

                      <TableCell align="right">
                        <Link to={`/order/${order._id}`}>
                          <Button>Details</Button>
                        </Link>
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

export default OrderListPage;
