import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Typography, Box, Grid, Card, CardContent, Container } from "@mui/material";

import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
// import products from "../products";
import { listProducts } from "../actions/productActions";
import Paginate from "../components/Paginate";
import Banner from "../components/Banner";

const HomePage = ({ keyword, pageNumber }) => {
  if (!pageNumber) pageNumber = 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Box sx={{ minHeight: "calc(100vh - 128px)", backgroundColor: "#171717", pt: 2 }}>
      <Container maxWidth="">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="error" text={error} />
        ) : (
          <>
            {pageNumber <= 1 && <Banner />}
            <Grid container spacing={2}>
              {products.map((product, index) => (
                <Product key={index} product={product} />
              ))}
              <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
};

export default HomePage;
