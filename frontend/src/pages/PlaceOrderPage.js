import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { getUserDetails } from "../actions/userActions";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const PlaceOrderPage = () => {
  const cart = useSelector((state) => state.cart);
  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.qty * (item.frame ? item.price + 10 : item.price), 0)
    .toFixed(2);
  cart.shippingPrice = (cart.itemsPrice > 250 ? 0 : 20).toFixed(2);
  cart.taxPrice = (0.12 * cart.itemsPrice).toFixed(2);
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error: userError, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      }
    }
  }, [navigate, userInfo, dispatch, user]);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  console.log(order);

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [success, navigate]);

  const handlePlaceOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  const theme = useTheme();
  const mediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const mediumPadding = mediumScreen ? 1 : 0;
  const mediumPaddingTop = mediumScreen ? 0 : 1;
  const smallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const smallPaddingBetween = smallScreen ? 0 : 1;
  const smallFontMultiplier = smallScreen ? 1 : 0.8;

  return (
    <Box sx={{ minHeight: "calc(100vh - 128px)", py: 4, px: 1, mt: 0, backgroundColor: "#171717", color: "grey.100" }}>
      <Container maxWidth="md">
        <CheckoutSteps step={2} />
      </Container>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ my: 3, fontSize: 34 * smallFontMultiplier }}>
          Place Order
        </Typography>
        {cart.cartItems.length === 0 ? (
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
          <Grid container>
            <Grid item md={8} sx={{ pr: mediumPadding }}>
              <Box sx={{ backgroundColor: "#374151", border: "2px solid", borderColor: "#374151" }}>
                <Grid container sx={{ m: 1 }}>
                  <Grid item xs={4}>
                    <Typography sx={{ color: "grey.400", fontSize: 16 * smallFontMultiplier }}>
                      Delivery Address
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={{ color: "grey.400", fontSize: 16 * smallFontMultiplier }}>
                      Account Details
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={{ color: "grey.400", fontSize: 16 * smallFontMultiplier }}>
                      Payment Method
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={4} container sx={{ backgroundColor: "grey.900", mt: "2px", display: "block", p: 1 }}>
                    <Typography sx={{ color: "grey.300", fontSize: 16 * smallFontMultiplier }}>
                      {cart.shippingAddress.address}
                    </Typography>
                    <Typography sx={{ color: "grey.300", fontSize: 16 * smallFontMultiplier }}>
                      {cart.shippingAddress.city}
                    </Typography>
                    <Typography sx={{ color: "grey.300", fontSize: 16 * smallFontMultiplier }}>
                      {cart.shippingAddress.postalCode}
                    </Typography>
                    <Typography sx={{ color: "grey.300", fontSize: 16 * smallFontMultiplier }}>
                      {cart.shippingAddress.country}
                    </Typography>
                  </Grid>

                  <Grid item xs={4} container sx={{ backgroundColor: "grey.900", mt: "2px", display: "block", p: 1 }}>
                    <Typography sx={{ color: "grey.300", fontSize: 16 * smallFontMultiplier }}>{user.name}</Typography>
                    <Typography sx={{ color: "grey.300", fontSize: 16 * smallFontMultiplier }}>{user.email}</Typography>
                  </Grid>

                  <Grid item xs={4} container sx={{ backgroundColor: "grey.900", mt: "2px", display: "block", p: 1 }}>
                    <Typography sx={{ color: "grey.300", fontSize: 16 * smallFontMultiplier }}>
                      {cart.paymentMethod}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ backgroundColor: "#374151", border: "2px solid", borderColor: "#374151", mt: 2 }}>
                <Grid container sx={{ m: 1 }}>
                  <Grid item xs={3} sx={{ pr: smallPaddingBetween }}>
                    <Typography sx={{ color: "grey.400", fontSize: 16 * smallFontMultiplier }}>Products</Typography>
                  </Grid>
                  <Grid item xs={7} sx={{ pr: smallPaddingBetween }}>
                    <Typography sx={{ color: "grey.400", fontSize: 16 * smallFontMultiplier }}>Name</Typography>
                  </Grid>
                  {smallScreen && (
                    <Grid item xs={1} sx={{ pr: smallPaddingBetween }}>
                      <Typography sx={{ color: "grey.400", fontSize: 16 * smallFontMultiplier }}>Price</Typography>
                    </Grid>
                  )}
                  <Grid item xs={1} sx={{ pr: smallPaddingBetween }}>
                    <Typography sx={{ color: "grey.400", fontSize: 16 * smallFontMultiplier }}>Qty</Typography>
                  </Grid>
                </Grid>

                {cart.cartItems.map((item) => (
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
                    <Grid item xs={7} sx={{ justifyContent: "center", p: 1 }}>
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
                    <Grid item xs={1} sx={{ p: 1.7 }}>
                      {item.qty}
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
                {cart.cartItems.map((item) => (
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
                    ${cart.itemsPrice}
                  </Grid>
                </Grid>

                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ backgroundColor: "grey.900", mt: "2px" }}
                >
                  <Grid item sm={9} sx={{ justifyContent: "left", p: 1 }}>
                    <Typography sx={{ color: "grey.200", fontSize: 16 * smallFontMultiplier }}>TAX</Typography>
                  </Grid>
                  <Grid item sm={3} sx={{ pr: 1, textAlign: "right", fontSize: 16 * smallFontMultiplier }}>
                    ${cart.taxPrice}
                  </Grid>
                </Grid>

                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ backgroundColor: "grey.900", mt: "2px" }}
                >
                  <Grid item sm={9} sx={{ justifyContent: "left", p: 1 }}>
                    <Typography sx={{ color: "grey.200", fontSize: 16 * smallFontMultiplier }}>
                      {Number(cart.shippingPrice) === 0 ? "FREE SHIPPING" : "SHIPPING"}
                    </Typography>
                  </Grid>
                  <Grid item sm={3} sx={{ pr: 1, textAlign: "right", fontSize: 16 * smallFontMultiplier }}>
                    ${cart.shippingPrice}
                  </Grid>
                </Grid>

                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ backgroundColor: "grey.900", mt: "2px" }}
                >
                  <Grid item sm={9} sx={{ justifyContent: "left", p: 1 }}>
                    <Typography sx={{ color: "grey.200", fontSize: 16 * smallFontMultiplier }}>TOTAL</Typography>
                  </Grid>
                  <Grid item sm={3} sx={{ pr: 1, textAlign: "right", fontSize: 16 * smallFontMultiplier }}>
                    ${cart.totalPrice}
                  </Grid>
                </Grid>
              </Box>

              {error && <Message variant="error" text={error} />}

              {cart.cartItems.length > 0 ? (
                <Button
                  color="success"
                  fullWidth
                  size="large"
                  variant="contained"
                  sx={{ textTransform: "none", mt: 1 }}
                  onClick={handlePlaceOrder}
                >
                  {/* <ShoppingCartCheckoutIcon style={{ marginRight: "5px" }} /> */}
                  Place Order
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
        )}
      </Container>
    </Box>
  );
};

export default PlaceOrderPage;
