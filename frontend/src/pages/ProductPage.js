import React from 'react'
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import products from '../products';
import Typography from '@mui/material/Typography';
import ProductRating from '../components/ProductRating';
import { Button } from '@mui/material';
const ProductPage = ({match}) => {
  // const product = products.find((p) => p._id === match.params.id)
  const product = products[5];

  return (


    <Grid container spacing={2} sx={{py: 20, px:5, backgroundColor:"grey.700"}}>
      <Grid item xs={12} sm={6}>
      <img src={product.image} alt={product.name} style={{width:"100%"}} />
      </Grid>
      <Grid item xs={12} sm={6}>
      <Box sx={{display: "flex", flexDirection: "column", color: "white" }}>
        <Typography variant='h4'>{product.name}</Typography>
        <Typography variant='p'><ProductRating value={product.rating} text={`${product.numReviews} reviews`}/></Typography>
        <Typography variant='p'>Price: ${product.price}</Typography>
        <Typography variant='p'>Status: {product.stock > 0 ? "In Stock" : "Out of Stock"}</Typography>
        <Box>
          <Button color='primary' variant='contained' sx={{textTransform: "none"}} disabled={product.stock === 0}>Add To Cart</Button>
        </Box>
      </Box>
      </Grid>
    </Grid>
  )
}

export default ProductPage