import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ProductRating from "../components/ProductRating";
import { FaLeaf, FaPaintBrush, FaImage } from "react-icons/fa";
import { BsBrush, BsPrinterFill } from "react-icons/bs";
import { IoIosContrast } from "react-icons/io";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./ProductPage.css";
import products from "../products";

const ProductPage = ({ match }) => {
  // const product = products.find((p) => p._id === match.params.id)
  // const [product, setProduct] = useState([])

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const {data} = await axios.get(`/api/products/${match.params.id}`)

  //     setProduct(data)
  //   }

  //   fetchProduct()
  // }, [match])

  const product = products[3];

  // const product = products[5];

  return (
    <Grid container spacing={2} sx={{ py: 10, px: 5, backgroundColor: "#171717" }}>
      <Grid item xs={12} md={6}>
        {/* <li className="Frame">
            <img src={product.image} alt={product.name} style={{ width: "100%" }} />
        </li> */}

        <img src={product.image} alt={product.name} style={{ width: "100%" }} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ display: "flex", flexDirection: "column", color: "white", ml: 1 }}>
          <Typography variant="h4">{product.name}</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", my: 2 }}>
            <Typography variant="p" sx={{ mt: "1px", mr: 1 }}>
              <ProductRating value={product.rating} />
            </Typography>
            <Typography variant="p">{product.numReviews} reviews</Typography>
          </Box>
          <Typography variant="h6">${product.price}</Typography>
          <Typography variant="p" sx={{ my: 2 }}>
            Quantity:{" "}
          </Typography>
          <Box sx={{ my: 3 }}>
            <Button color="primary" size="large" variant="contained" sx={{ textTransform: "none" }} disabled={product.stock === 0}>
              Add To Cart
            </Button>
          </Box>
          <Typography sx={{ mt: 3 }} variant="h6" component="div">
            All of our art prints are made with:
          </Typography>
          <List sx={{mb:1}}>
            <ListItem>
              <ListItemIcon sx={{ color: "white", fontSize: "1.2rem", display: "flex", justifyContent: "center" }}>
                <FaLeaf />
              </ListItemIcon>
              <ListItemText primary="Smooth, acid-free matte paper" />
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ color: "white", fontSize: "1.2rem", display: "flex", justifyContent: "center" }}>
                <FaPaintBrush />
              </ListItemIcon>
              <ListItemText primary="Smudge proof coating" />
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ color: "white", fontSize: "1.2rem", display: "flex", justifyContent: "center" }}>
                <BsPrinterFill />
              </ListItemIcon>
              <ListItemText primary="Printed using fade-resistant pigment inks" />
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ color: "white", fontSize: "1.2rem", display: "flex", justifyContent: "center" }}>
                <FaImage />
              </ListItemIcon>
              <ListItemText primary="High contrast and maximum density image resolution" />
            </ListItem>
          </List>
          <Box sx={{width:"calc(min(500px, 100%))"}}>
            <Accordion sx={{backgroundColor:'grey.900', color:'grey.100'}}>
              <AccordionSummary expandIcon={<ExpandMoreIcon style={{color:"white"}} />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Reviews</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{color:'grey.200'}}>
                <Typography variant='h6' sx={{mb:2}}>Customer Reviews</Typography>
                <Box sx={{display:"flex", justifyContent:'space-between'}}>

                <Typography variant='p'>No written reviews yet</Typography>
                <Typography variant='p'>Leave a review</Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Grid>
      <Grid item xl={12} sx={{ mt: 20 }}>
        <Box sx={{ display: "flex", flexDirection: "column", color: "white" }}>
          <Typography variant="h5" align="center">
            You may also like
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductPage;
