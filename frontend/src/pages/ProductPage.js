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
import "./ProductPage.css";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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

  const theme = useTheme();

  const mediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const mediumAlign = mediumScreen ? "left" : "center";
  const mediumPagePadding = mediumScreen ? 5 : 2;

  return (
    <Box sx={{ minHeight: "calc(100vh - 128px)", py: 4, px: mediumPagePadding, mt: 0, backgroundColor: "#171717", textAlign: mediumAlign }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Box sx={{ display: "flex" }}>
          <ArrowBackIcon sx={{ color: "grey.100", mr: 1 }} />
          <Typography sx={{ color: "grey.100" }}>Go Back</Typography>
        </Box>
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message
          variant="error"
          children={
            <Typography variant="p" sx={{ fontWeight: 500 }}>
              {error}
            </Typography>
          }
        />
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
              <Box sx={{ display: "flex", justifyContent: mediumAlign, flexDirection: "row", my: 2 }}>
                <Typography variant="p" sx={{ mt: "1px", mr: 1 }}>
                  <ProductRating value={product.rating} />
                </Typography>
                <Typography variant="p">{product.numReviews} reviews</Typography>
              </Box>
              <Typography variant="h6">${frame ? product.price + 10 : product.price}</Typography>

              <Typography variant="p" sx={{ my: 2 }}>
                Size: 42x29cm
              </Typography>

              <Box sx={{ display: "flex", justifyContent: mediumAlign, alignItems: "center", my: 1 }}>
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

              <Box sx={{ display: "flex", justifyContent: mediumAlign, alignItems: "center", my: 1 }}>
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
              <List sx={{ mb: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <ListItem sx={{ display: "flex", flexDirection: "row", justifyContent: mediumAlign }}>
                  <FaLeaf />
                  <Typography sx={{ ml: 2 }}>Smooth, acid-free matte paper</Typography>
                </ListItem>
                <ListItem sx={{ display: "flex", flexDirection: "row", justifyContent: mediumAlign }}>
                  <FaPaintBrush />
                  <Typography sx={{ ml: 2 }}>Smudge proof coating</Typography>
                </ListItem>
                <ListItem sx={{ display: "flex", flexDirection: "row", justifyContent: mediumAlign }}>
                  <BsPrinterFill />
                  <Typography sx={{ ml: 2 }}>Fade-resistant pigment inks</Typography>
                </ListItem>
                <ListItem sx={{ display: "flex", flexDirection: "row", justifyContent: mediumAlign }}>
                  <FaImage />
                  <Typography sx={{ ml: 2 }}>High contrast and 300 PPI image resolution</Typography>
                </ListItem>
              </List>
              <Box sx={{ width: "100%", display: "flex", justifyContent: mediumAlign }}>
                <Accordion sx={{ backgroundColor: "#374151", color: "grey.100", width: "500px" }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: "white" }} />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>Reviews</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ color: "grey.200" }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Customer Reviews
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography>No written reviews yet</Typography>
                      <Typography>Leave a review</Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ mt: 20 }}>
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
