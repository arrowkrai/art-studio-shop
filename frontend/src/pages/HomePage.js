import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Container from "@mui/material/Container";
// import products from "../products";
import { listProducts } from "../actions/productActions";

const HomePage = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // TODO: If first page of shop, have a big banner with text welcoming the visitor.
  return (
    <Box sx={{ backgroundColor: "#171717", pt: 2 }}>
      <Container maxWidth="">
        {loading ? (
          <Box sx={{ width: "100%", height: "100vh" }}>
            <Loader />
          </Box>
        ) : error ? (
          <Box sx={{ width: "100%", height: "100vh" }}>
            <Message
              variant="error"
              children={
                <Typography variant="p" sx={{ fontWeight: 500 }}>
                  {error}
                </Typography>
              }
            />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {products.map((product, index) => (
              <Product key={index} product={product} />
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default HomePage;
