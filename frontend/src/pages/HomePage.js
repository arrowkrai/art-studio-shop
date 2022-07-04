import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import products from "../products";
import Product from "../components/Product";
import Container from "@mui/material/Container";


const HomePage = () => {
  return (
    <Box sx={{ backgroundColor: "grey.700" }}>
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
