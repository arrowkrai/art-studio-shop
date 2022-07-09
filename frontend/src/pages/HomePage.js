import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Typography, Box, Grid, Card, CardContent, Container } from "@mui/material";

import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
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
    <Box sx={{ minHeight: "calc(100vh - 128px)", backgroundColor: "#171717", pt: 2 }}>
      <Container maxWidth="">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="error" text={error} />
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
