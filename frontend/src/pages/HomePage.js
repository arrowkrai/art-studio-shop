import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Typography, Box, Grid, Card, CardContent, Container } from "@mui/material";

import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
// import products from "../products";
import { listProducts } from "../actions/productActions";
import Paginate from "../components/Paginate";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const HomePage = ({ keyword, pageNumber }) => {
  if (!pageNumber) pageNumber = 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const theme = useTheme();

  const xlargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const largeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const smallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const bannerHeight = xlargeScreen ? 550 : 400;
  const textPositionTop = xlargeScreen ? 500 : largeScreen ? 380 : smallScreen ? 400 : 350;
  const textFontSize = xlargeScreen ? 96 : largeScreen ? 68 : smallScreen ? 46 : 38;

  return (
    <Box sx={{ minHeight: "calc(100vh - 128px)", backgroundColor: "#171717", pt: 2 }}>
      <Container maxWidth="">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="error" text={error} />
        ) : (
          <>
            {pageNumber > 1 ? (
              <Box></Box>
            ) : (
              <Box sx={{ mb: 10 }}>
                <Box
                  sx={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${"/images/055_Obsidian_Dragon_Sett.jpg"})`,
                    height: bannerHeight,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    color: "white",
                    fontWeight: 700,
                    position: "absolute",
                    top: textPositionTop,
                    left: 50,
                    fontSize: textFontSize,
                    pr: 5,
                  }}
                >
                  West Studio Art Shop
                </Typography>
                {/* <img src="/images/106_Arcana_Tahm_Kench.jpg" style={{width:"100%", height:"50"}}/> */}
              </Box>
            )}
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
