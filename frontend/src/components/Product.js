import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import ProductRating from "./ProductRating";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";

const Product = ({ product }) => {
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const imageTitleFontSize = largeScreen ? 18 : 16;
  const imageSubtitleFontSize = largeScreen ? 16 : 14;
  const imageSubtitleRightSpacing = largeScreen ? 106 : 100;

  return (
    <Grid item xs={12} md={6} xl={4} sx={{ color: "grey.100" }}>
      {/* <Link href={`/product/${product._id}`} underline="none" sx={{ color: "grey.200" }}> */}
      <Link to={`/product/${product._id}`}>
        {/* <MyImage src={product.image}/> */}
        <Box sx={{ position: "relative", color: "grey.100" }}>
          <img src={product.image} style={{ width: "100%" }} alt={product.name} />
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              transition: "all 0.2s ease-in-out",
              opacity: 0,
              "&:hover": { backgroundColor: "rgba(0,0,0,0.7)", opacity: 1 },
            }}
          >
            <Typography sx={{ position: "absolute", bottom: 16, left: 16, fontSize: imageTitleFontSize, width: "50%" }}>
              {product.name}
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                bottom: 16,
                right: imageSubtitleRightSpacing,
                color: "grey.500",
                fontSize: imageSubtitleFontSize,
              }}
            >{`${product.numReviews} reviews`}</Typography>
            <ProductRating
              value={product.rating}
              props={{ position: "absolute", bottom: 16, right: 16, fontSize: imageSubtitleFontSize }}
            />
          </Box>
        </Box>
      </Link>
    </Grid>
  );
};

export default Product;
