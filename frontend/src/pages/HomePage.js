import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Product from "../components/Product";
import Container from "@mui/material/Container";
import axios from "axios";
// import products from "../products";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");

      setProducts(data);
    };

    fetchProducts();
  }, []);

  // TODO: If first page of shop, have a big banner with text welcoming the visitor.
  return (
    <Box sx={{ backgroundColor: "#171717" }}>
      <Container maxWidth="">
        <Grid container spacing={2}>
          {products.map((product) => (
            <Product product={product} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
