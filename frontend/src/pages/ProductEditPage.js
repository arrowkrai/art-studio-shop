import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ProductEditPage = ({ id }) => {
  const productId = id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [stock, setStock] = useState(0);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setStock(product.stock);
      }
    }
  }, [dispatch, navigate, productId, product, successUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ _id: productId, name, price, image, stock }));
  };

  return (
    <Box sx={{ minHeight: "calc(100vh - 128px)", py: 4, px: 1, mt: 0, backgroundColor: "#171717", color: "grey.100" }}>
      <Container maxWidth="sm">
        <Link to="/admin/productlist" style={{ textDecoration: "none" }}>
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
              Edit Product
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
              id="price"
              label="Price"
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
              id="image"
              label="Enter Image URL"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
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
              id="stock"
              label="Stock"
              type="number"
              name="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />

            <Button type="submit" fullWidth variant="contained" sx={{ my: 1, textTransform: "none" }}>
              Update
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProductEditPage;
