import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  List,
  ListItem,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  MenuItem,
  Select,
  Rating,
  TextField,
  Divider,
} from "@mui/material";
import ProductRating from "../components/ProductRating";
import { FaLeaf, FaPaintBrush, FaImage } from "react-icons/fa";
import { BsBrush, BsPrinterFill } from "react-icons/bs";
import { IoIosContrast } from "react-icons/io";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./ProductPage.css";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, createProductReview } from "../actions/productActions";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loader from "../components/Loader";
import Message from "../components/Message";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "./ProductPage.css";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import { styled } from "@mui/material/styles";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { grey } from "@mui/material/colors";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: grey[100],
  },
  "& .MuiRating-iconHover": {
    color: grey[100],
  },
  "& .MuiRating-iconEmpty": {
    color: grey[500],
  },
});

const ProductPage = ({ id }) => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [frame, setFrame] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errorRating, setErrorRating] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}&frame=${frame}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      setErrorRating("You must give a rating");
    } else {
      setErrorRating("");
      dispatch(createProductReview(id, { rating, comment }));
    }
  };

  const theme = useTheme();

  const mediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const mediumAlign = mediumScreen ? "left" : "center";
  const mediumPagePadding = mediumScreen ? 5 : 2;

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 128px)",
        py: 4,
        px: mediumPagePadding,
        mt: 0,
        backgroundColor: "#171717",
        textAlign: mediumAlign,
      }}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <Box sx={{ display: "flex" }}>
          <ArrowBackIcon sx={{ color: "grey.100", mr: 1 }} />
          <Typography sx={{ color: "grey.100" }}>Go Back</Typography>
        </Box>
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error" text={error} />
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
                    <Select
                      sx={{ backgroundColor: "#374151", color: "grey.100" }}
                      id="frame-select"
                      value={frame}
                      onChange={(e) => setFrame(e.target.value)}
                    >
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
                    <Select
                      sx={{ backgroundColor: "#374151", color: "grey.100" }}
                      id="qty-select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
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
                  <Button
                    size="large"
                    variant="contained"
                    disabled
                    sx={{ textTransform: "none", "&.Mui-disabled": { backgroundColor: "grey.800", color: "grey.300" } }}
                  >
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
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Reviews</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ color: "grey.200" }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Customer Reviews
                    </Typography>

                    {product.reviews.length === 0 ? (
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography sx={{ color: "grey.100", fontSize: 14 }}>No written reviews yet</Typography>

                        {userInfo ? (
                          <Typography sx={{ color: "grey.100", fontSize: 14 }}>Be the first to review!</Typography>
                        ) : (
                          <Link to="/login" style={{ textDecoration: "none" }}>
                            <Typography sx={{ color: "grey.100", fontSize: 14 }}>Login to write a review</Typography>
                          </Link>
                        )}
                      </Box>
                    ) : (
                      <List disablePadding>
                        {product.reviews.map((review, index) => (
                          <ListItem key={review.name + index} disableGutters sx={{ display: "block" }}>
                            <Divider sx={{ mb: 3 }} />

                            <ProductRating value={review.rating} />

                            <Typography component="span" sx={{ color: "grey.100", fontSize: 16, pr: 1 }}>
                              {review.name}
                            </Typography>

                            <Typography component="span" sx={{ color: "grey.400", fontSize: 14 }}>
                              {review.createdAt.substring(0, 10)}
                            </Typography>
                            <Typography sx={{ color: "grey.100", fontSize: 14, py: 1 }}>{review.comment}</Typography>
                          </ListItem>
                        ))}
                      </List>
                    )}

                    <List disablePadding>
                      <ListItem disableGutters disablePadding sx={{ display: "block" }}>
                        {errorProductReview && <Message variant="error" text={errorProductReview} />}
                        {errorRating && <Message variant="error" text={errorRating} />}

                        {userInfo ? (
                          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "100%", mt: 3 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <Typography variant="h6">Your Review</Typography>
                              <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Typography variant="span" sx={{ pr: 1 }}>
                                  Rating
                                </Typography>
                                <StyledRating
                                  required
                                  precision={1}
                                  icon={<FaStar fontSize="16" />}
                                  emptyIcon={<FaRegStar fontSize="16" />}
                                  value={rating}
                                  onChange={(e) => setRating(Number(e.target.value))}
                                />{" "}
                              </Box>
                            </Box>
                            <TextField
                              sx={{
                                my: 1,
                                backgroundColor: "grey.800",
                                input: { color: "grey.100" },
                                ".MuiInputLabel-animated": { color: "grey.400" },
                                ".MuiInputLabel-animated.Mui-focused": { color: "primary.light" },
                                ".MuiInputBase-inputMultiline": { color: "white" },
                                borderRadius: 1,
                              }}
                              required
                              fullWidth
                              id="comment"
                              label="Comment"
                              name="comment"
                              value={comment}
                              multiline
                              rows={4}
                              onChange={(e) => setComment(e.target.value)}
                            />

                            <Button type="submit" fullWidth variant="contained" sx={{ my: 1, textTransform: "none" }}>
                              Submit
                            </Button>
                          </Box>
                        ) : null}
                      </ListItem>
                      {product.reviews.length !== 0 && !userInfo && (
                        <Link to="/login" style={{ textDecoration: "none" }}>
                          <Typography sx={{ color: "grey.100", fontSize: 14 }}>Login to write a review</Typography>
                        </Link>
                      )}
                    </List>
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
