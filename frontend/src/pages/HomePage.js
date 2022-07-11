import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Grid, Container } from "@mui/material";

import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions";
import Paginate from "../components/Paginate";
import Banner from "../components/Banner";
import Title from "../components/Title";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PRODUCT_DETAILS_RESET } from "../constants/productConstants";

const HomePage = ({ keyword, pageNumber }) => {
  if (!pageNumber) pageNumber = 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
    dispatch({ type: PRODUCT_DETAILS_RESET });
  }, [dispatch, keyword, pageNumber]);

  return (
    <Box sx={{ minHeight: "calc(100vh - 128px)", backgroundColor: "#171717", pt: 2 }}>
      <Title />
      <Container maxWidth="">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="error" text={error} />
        ) : (
          <>
            {pageNumber <= 1 && !keyword && <Banner />}
            {keyword && (
              <Link to="/" style={{ textDecoration: "none" }}>
                <Box sx={{ display: "flex", mb: 3 }}>
                  <ArrowBackIcon sx={{ color: "grey.100", mr: 1 }} />
                  <Typography sx={{ color: "grey.100" }}>Go Back</Typography>
                </Box>
              </Link>
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
