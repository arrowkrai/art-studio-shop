import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";
import Rating from "@mui/material/Rating";
import ProductRating from "./ProductRating";

const Product = ({ product }) => {
  return (
    <Grid item xs={12} md={6} lg={4} sx={{ color: "grey.100" }}>
      <Link href={`/product/${product._id}`} underline="none" sx={{ color: "grey.200" }}>
        <img src={product.image} style={{ width: "100%" }} alt="" />
        {product.name}
        <ProductRating value={product.rating} text={`${product.numReviews} reviews`} />
      </Link>
    </Grid>
  );
};

export default Product;
