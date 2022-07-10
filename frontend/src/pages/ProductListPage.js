import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts, deleteProduct, createProduct } from "../actions/productActions";
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
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import Paginate from "../components/Paginate";

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

const ProductListPage = ({ id, pageNumber }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!pageNumber) pageNumber = 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate("/login");
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      console.log(pageNumber);
      dispatch(listProducts("", pageNumber));
    }
  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, pageNumber]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleCreateProduct = (product) => {
    dispatch(createProduct());
  };

  return (
    <Box sx={{ minHeight: "calc(100vh - 128px)", py: 4, px: 1, mt: 0, backgroundColor: "#171717", color: "grey.100" }}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 3 }}>
            Products
          </Typography>
          <Button onClick={handleCreateProduct}>Create Product</Button>
          {loadingDelete && <Loader />}
          {errorDelete && <Message variant="error" text={errorDelete} />}
          {loadingCreate && <Loader />}
          {errorCreate && <Message variant="error" text={errorCreate} />}
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
          <Paginate pages={pages} page={page} isAdmin={true} />
        </Container>
      </ThemeProvider>
    </Box>
  );
};

export default ProductListPage;
