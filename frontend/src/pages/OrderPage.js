import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { saveShippingAddress } from "../actions/cartActions";
import { getOrderDetails, payOrder, deliverOrder } from "../actions/orderActions";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../constants/orderConstants";

const OrderPage = ({ id, search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    // addPayPalScript();

    if (!order || success || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, success, successDeliver, order]);

  const handlePaymentSuccess = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(id, paymentResult));
  };

  const handleDeliver = () => {
    dispatch(deliverOrder(order));
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
      <Container maxWidth="xl">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="error" text={error} />
        ) : (
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h3" sx={{ my: 3, fontSize: 34 * smallFontMultiplier }}>
                Order Details{" "}
                <Typography variant="span" sx={{ my: 3, fontSize: 18 * smallFontMultiplier, color: "grey.400" }}>
                  ID: {order._id}
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={8} sx={{ pr: 1, mb: 2 }}>
                {order.isDelivered ? (
                  <Message variant="success" text="Delivered!" />
                ) : order.isPaid ? (
                  <Message variant="success" text="Order Confirmed!" />
                ) : (
                  <Message variant="error" text="Order Not Paid!" />
                )}
              </Grid>
            </Grid>
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
                      {order.shippingAddress.address}
                    </Typography>
                    <Typography sx={{ color: "grey.300", fontSize: 16 * smallFontMultiplier }}>
                      {order.shippingAddress.city}
                    </Typography>
                    <Typography sx={{ color: "grey.300", fontSize: 16 * smallFontMultiplier }}>
                      {order.shippingAddress.postalCode}
                    </Typography>
                    <Typography sx={{ color: "grey.300", fontSize: 16 * smallFontMultiplier }}>
                      {order.shippingAddress.country}
                    </Typography>
                  </Grid>

                  <Grid item xs={4} container sx={{ backgroundColor: "grey.900", mt: "2px", display: "block", p: 1 }}>
                    <Typography sx={{ color: "grey.300", fontSize: 16 * smallFontMultiplier }}>
                      {order.user.name}
                    </Typography>
                    <Typography sx={{ color: "grey.300", fontSize: 16 * smallFontMultiplier }}>
                      {order.user.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} container sx={{ backgroundColor: "grey.900", mt: "2px", display: "block", p: 1 }}>
                    <Typography sx={{ color: "grey.300", fontSize: 16 * smallFontMultiplier }}>
                      {order.paymentMethod}
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

                {order.orderItems.map((item) => (
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
                {order.orderItems.map((item) => (
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
                    {order.orderItems
                      .reduce((acc, item) => acc + item.qty * (item.frame ? item.price + 10 : item.price), 0)
                      .toFixed(2)}
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
                    ${Number(order.taxPrice).toFixed(2)}
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
                      {Number(order.shippingPrice) === 0 ? "FREE SHIPPING" : "SHIPPING"}
                    </Typography>
                  </Grid>
                  <Grid item sm={3} sx={{ pr: 1, textAlign: "right", fontSize: 16 * smallFontMultiplier }}>
                    ${Number(order.shippingPrice).toFixed(2)}
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
                    ${Number(order.totalPrice).toFixed(2)}
                  </Grid>
                </Grid>
              </Box>

              {!order.isPaid && (
                <Grid container>
                  <Grid item sm={12} sx={{ mt: 2 }}>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton amount={order.totalPrice} onSuccess={handlePaymentSuccess} />
                    )}
                  </Grid>
                </Grid>
              )}

              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <Button onClick={handleDeliver}>Mark As Delivered</Button>
              )}

              {error && <Message variant="error" text={error} />}
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default OrderPage;
