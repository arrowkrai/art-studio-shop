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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./ProductPage.css";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import './ProductPage.css'

const ProductPage = ({ id }) => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [frame, setFrame] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}&frame=${frame}`);
  };

  return (
    <Box sx={{ py: 4, px: 5, mt: 0, backgroundColor: "#171717" }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Box sx={{ display: "flex" }}>
          <ArrowBackIcon sx={{ color: "grey.100", mr: 1 }} />
          <Typography sx={{ color: "grey.100" }}>Go Back</Typography>
        </Box>
      </Link>

      {loading ? (
        <Box sx={{ width: "100%", height: "100vh" }}>
          <Loader />
        </Box>
      ) : error ? (
        <Box sx={{ width: "100%", height: "100vh" }}>
          <Message
            variant="error"
            children={
              <Typography variant="p" sx={{ fontWeight: 500 }}>
                {error}
              </Typography>
            }
          />
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ py: 6 }}>
          <Grid item xs={12} md={7}>
            {frame ? (
              <li className="Frame">
                <img src={product.image} alt={product.name} style={{ width: "100%" }} />
              </li>
            ) : (
              <img src={product.image} alt={product.name} style={{ width: "100%" }} />
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            <Box sx={{ display: "flex", flexDirection: "column", color: "white", ml: 1 }}>
              <Typography variant="h4">{product.name}</Typography>
              <Box sx={{ display: "flex", flexDirection: "row", my: 2 }}>
                <Typography variant="p" sx={{ mt: "1px", mr: 1 }}>
                  <ProductRating value={product.rating} />
                </Typography>
                <Typography variant="p">{product.numReviews} reviews</Typography>
              </Box>
              <Typography variant="h6">${frame ? product.price + 10 : product.price}</Typography>

              <Typography variant="p" sx={{ my: 2, mr: 2 }}>
                Size: 42x29cm
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
                <Typography variant="p" sx={{ mr: 2 }}>
                  Frame:
                </Typography>

                {product.stock > 0 && (
                  <FormControl size="small" variant="outlined" sx={{ width: 80 }}>
                    <Select sx={{ backgroundColor: "#374151", color: "grey.100" }} id="frame-select" value={frame} onChange={(e) => setFrame(e.target.value)}>
                      <MenuItem value={false}>No</MenuItem>
                      <MenuItem value={true}>Yes</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
                <Typography variant="p" sx={{ mr: 2 }}>
                  Quantity:
                </Typography>

                {product.stock > 0 && (
                  <FormControl size="small" variant="outlined" sx={{ width: 60 }}>
                    <Select sx={{ backgroundColor: "#374151", color: "grey.100" }} id="qty-select" value={qty} onChange={(e) => setQty(e.target.value)}>
                      {[...Array(product.stock).keys()].map((x) => (
                        <MenuItem key={x + 1} value={x + 1}>
                          {x + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Box>

              <Box sx={{ mb: 1, mt: 2 }}>
                {product.stock > 0 ? (
                  <Button size="large" variant="contained" sx={{ textTransform: "none" }} onClick={addToCartHandler}>
                    <AddShoppingCartIcon style={{ marginRight: "5px" }} />
                    Add To Cart
                  </Button>
                ) : (
                  <Button size="large" variant="contained" disabled sx={{ textTransform: "none", "&.Mui-disabled": { backgroundColor: "grey.800", color: "grey.300" } }}>
                    Out Of Stock
                  </Button>
                )}
              </Box>
              <Typography sx={{ mt: 3 }} variant="h6" component="div">
                All of our art prints are made with:
              </Typography>
              <List sx={{ mb: 1 }}>
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
                  <ListItemText primary="High contrast with 300 PPI image resolution" />
                </ListItem>
              </List>
              <Box sx={{ width: "calc(min(500px, 100%))" }}>
                <Accordion sx={{ backgroundColor: "#374151", color: "grey.100" }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: "white" }} />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>Reviews</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ color: "grey.200" }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Customer Reviews
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="p">No written reviews yet</Typography>
                      <Typography variant="p">Leave a review</Typography>
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
      )}
    </Box>
  );
};

export default ProductPage;
