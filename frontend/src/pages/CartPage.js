import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
  Grid,
  FormControl,
  List,
  MenuItem,
  Select,
} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { FaTrash } from "react-icons/fa";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Title from "../components/Title";

const CartPage = ({ id, search }) => {
  const navigate = useNavigate();
  const productId = id;

  const qty = search ? Number(search.split("&")[0].split("=")[1]) : 1;
  const frame = search ? search.split("&")[1].split("=")[1] === "true" : false;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(id, qty, frame));
    }
  }, [dispatch, productId, qty, frame, id]);

  const theme = useTheme();

  const mediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const mediumPadding = mediumScreen ? 1 : 0;
  const mediumPaddingTop = mediumScreen ? 0 : 1;
  const smallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const smallPaddingBetween = smallScreen ? 0 : 1;
  const smallFontMultiplier = smallScreen ? 1 : 0.8;

  return (
    <Box sx={{ minHeight: "calc(100vh - 128px)", py: 4, px: 1, mt: 0, backgroundColor: "#171717", color: "grey.100" }}>
      <Container maxWidth="xl">
        <Title title="Shopping Cart" />
        <Link to="/" style={{ textDecoration: "none" }}>
          <Box sx={{ display: "flex" }}>
            <ArrowBackIcon sx={{ color: "grey.100", mr: 1 }} />
            <Typography sx={{ color: "grey.100" }}>Go Back</Typography>
          </Box>
        </Link>

        <Typography variant="h4" sx={{ my: 3, fontSize: 34 * smallFontMultiplier }}>
          Shopping Cart
        </Typography>
        {cartItems.length === 0 ? (
          <Typography>
            Your cart is empty
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                component="span"
                sx={{ ml: 1, color: "primary.light", "&:hover": { textDecoration: "underline" } }}
              >
                Go Back
              </Typography>
            </Link>
          </Typography>
        ) : (
          <List>
            <Grid container>
              <Grid item md={8} sx={{ pr: mediumPadding }}>
                <Box sx={{ backgroundColor: "#374151", border: "2px solid", borderColor: "#374151" }}>
                  <Grid container sx={{ m: 1 }}>
                    <Grid item xs={3} sx={{ pr: smallPaddingBetween }}>
                      <Typography sx={{ color: "grey.400", fontSize: 16 * smallFontMultiplier }}>Products</Typography>
                    </Grid>
                    <Grid item xs={5} sx={{ pr: smallPaddingBetween }}>
                      <Typography sx={{ color: "grey.400", fontSize: 16 * smallFontMultiplier }}>Name</Typography>
                    </Grid>
                    {smallScreen && (
                      <Grid item xs={1} sx={{ pr: smallPaddingBetween }}>
                        <Typography sx={{ color: "grey.400", fontSize: 16 * smallFontMultiplier }}>Price</Typography>
                      </Grid>
                    )}
                    <Grid item xs={2} sx={{ pr: smallPaddingBetween }}>
                      <Typography sx={{ color: "grey.400", fontSize: 16 * smallFontMultiplier }}>Qty</Typography>
                    </Grid>
                  </Grid>
                  {cartItems.map((item) => (
                    <Grid
                      key={item.name}
                      container
                      justifyContent="center"
                      alignItems="center"
                      sx={{ backgroundColor: "grey.900", mt: "2px" }}
                    >
                      <Grid item xs={3} sx={{ p: 1 }}>
                        <Link to={`/product/${item.product}`}>
                          <img src={item.image} alt={item.name} style={{ width: "100%" }} />
                        </Link>
                      </Grid>
                      <Grid item xs={5} sx={{ justifyContent: "center", p: 1 }}>
                        <Link to={`/product/${item.product}`} style={{ textDecoration: "none" }}>
                          <Typography
                            color="primary.light"
                            sx={{ fontSize: 16 * smallFontMultiplier, "&:hover": { textDecoration: "underline" } }}
                          >
                            {item.name}
                          </Typography>
                        </Link>

                        <Typography sx={{ color: "grey.500", fontSize: 14 * smallFontMultiplier }}>
                          Add Frame:{" "}
                          {item.frame ? (
                            <Typography component="span" sx={{ color: "grey.100", fontSize: 14 * smallFontMultiplier }}>
                              Yes
                            </Typography>
                          ) : (
                            "No"
                          )}
                        </Typography>
                        <Typography sx={{ color: "grey.500", fontSize: 14 * smallFontMultiplier }}>42x29cm</Typography>
                      </Grid>
                      {smallScreen && (
                        <Grid item xs={1} sx={{ p: 1, fontSize: 16 * smallFontMultiplier }}>
                          ${item.frame ? item.price + 10 : item.price}
                        </Grid>
                      )}
                      <Grid item xs={2 + smallPaddingBetween} sx={{ p: 1 }}>
                        <FormControl size="small" variant="outlined" sx={{ width: 60 }}>
                          <Select
                            sx={{
                              backgroundColor: "#374151",
                              color: "grey.100",
                              fontSize: 16 * smallFontMultiplier,
                              icon: { fill: "white" },
                            }}
                            id="qty-select"
                            value={item.qty}
                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value), item.frame))}
                          >
                            {[...Array(item.stock).keys()].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton
                          onClick={() => removeFromCartHandler(item.product)}
                          size="small"
                          sx={{ color: "grey.100", fontSize: 16 * smallFontMultiplier }}
                        >
                          <FaTrash />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </Box>
              </Grid>

              <Grid item md={4} sx={{ pl: mediumPadding, width: "100%", pt: mediumPaddingTop }}>
                <Box sx={{ backgroundColor: "#374151", border: "2px solid", borderColor: "#374151" }}>
                  <Grid container sx={{ m: 1 }}>
                    <Grid item xs={7}>
                      <Typography sx={{ color: "grey.400", fontSize: 16 * smallFontMultiplier }}>Items</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        sx={{ color: "grey.400", textAlign: "center", px: 1, fontSize: 16 * smallFontMultiplier }}
                      >
                        Qty
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        sx={{ color: "grey.400", textAlign: "right", pr: 2, fontSize: 16 * smallFontMultiplier }}
                      >
                        Price
                      </Typography>
                    </Grid>
                  </Grid>
                  {cartItems.map((item) => (
                    <Grid
                      key={item.name}
                      container
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ backgroundColor: "grey.900", mt: "2px" }}
                    >
                      <Grid item xs={7} sx={{ justifyContent: "center", p: 1 }}>
                        <Typography noWrap sx={{ color: "grey.300", fontSize: 14 * smallFontMultiplier }}>
                          {item.name}{" "}
                          <Typography component="span" sx={{ color: "grey.500", fontSize: 12 * smallFontMultiplier }}>
                            42x29cm
                            {item.frame && " - framed"}
                          </Typography>
                        </Typography>
                      </Grid>

                      <Grid
                        item
                        xs={2}
                        sx={{ color: "grey.300", textAlign: "center", pl: 2, fontSize: 16 * smallFontMultiplier }}
                      >
                        {item.qty}
                      </Grid>

                      <Grid
                        item
                        xs={3}
                        sx={{ color: "grey.300", pr: 1, textAlign: "right", fontSize: 16 * smallFontMultiplier }}
                      >
                        ${item.frame ? (item.price + 10).toFixed(2) : item.price.toFixed(2)}
                      </Grid>
                    </Grid>
                  ))}

                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ backgroundColor: "grey.900", mt: "2px" }}
                  >
                    <Grid item sm={9} sx={{ justifyContent: "left", p: 1 }}>
                      <Typography sx={{ color: "grey.200", fontSize: 16 * smallFontMultiplier }}>SUBTOTAL</Typography>
                    </Grid>

                    <Grid item sm={3} sx={{ pr: 1, textAlign: "right", fontSize: 16 * smallFontMultiplier }}>
                      $
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * (item.frame ? item.price + 10 : item.price), 0)
                        .toFixed(2)}
                    </Grid>
                  </Grid>
                </Box>

                {cartItems.length > 0 ? (
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    sx={{ textTransform: "none", mt: 1 }}
                    onClick={checkoutHandler}
                  >
                    <ShoppingCartCheckoutIcon style={{ marginRight: "5px" }} />
                    Proceed to Checkout
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    disabled
                    sx={{
                      mt: 1,
                      textTransform: "none",
                      "&.Mui-disabled": { backgroundColor: "grey.800", color: "grey.300" },
                    }}
                  >
                    Cart is empty
                  </Button>
                )}
              </Grid>
            </Grid>
          </List>
        )}
      </Container>
    </Box>
  );
};

export default CartPage;
