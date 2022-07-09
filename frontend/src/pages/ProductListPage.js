import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions";
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
import { Link, useNavigate } from "react-router-dom";

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

const ProductListPage = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
    }
  };

  const handleCreateProduct = (product) => {};

  return (
    <Box sx={{ minHeight: "calc(100vh - 128px)", py: 4, px: 1, mt: 0, backgroundColor: "#171717", color: "grey.100" }}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 3 }}>
            Products
          </Typography>
          <Button onClick={handleCreateProduct}>Create Product</Button>
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
                    <TableCell align="right">PRICE</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {product._id}
                      </TableCell>
                      <TableCell align="right">{product.name}</TableCell>
                      <TableCell align="right">${product.price}</TableCell>
                      <TableCell align="right">
                        <Link to={`/admin/product/${product._id}/edit`}>
                          <Button>Edit</Button>
                        </Link>
                        <Button color="error" onClick={() => handleDelete(product._id)}>
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

export default ProductListPage;
