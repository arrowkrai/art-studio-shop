import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, List, ListItem, TextField, Typography } from "@mui/material";
import { getProfileOrders } from "../actions/orderActions";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const ProfilePage = ({ search }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListProfile = useSelector((state) => state.orderListProfile);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(getProfileOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, dispatch, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  const theme = useTheme();
  const mediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const mediumPadding = mediumScreen ? 2 : 0;
  const mediumPaddingTop = mediumScreen ? 0 : 1;
  const smallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const smallPaddingBetween = smallScreen ? 0 : 1;
  const smallFontMultiplier = smallScreen ? 1 : 0.8;

  return (
    <Box sx={{ minHeight: "calc(100vh - 128px)", py: 4, px: 1, mt: 0, backgroundColor: "#171717", color: "grey.100" }}>
      <Container maxWidth="xl">
        {message && <Message variant="error" text={message} />}
        {error && <Message variant="error" text={error} />}
        {success && <Message variant="success" text="Profile Updated!" />}
        {loading && <Loader />}

        <Grid container>
          <Grid item md={6} sx={{ pr: mediumPadding }}>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <Typography variant="h3" sx={{ mb: 3, fontSize: 48 * smallFontMultiplier }}>
                Profile Details
              </Typography>
              <TextField sx={{ my: 1, backgroundColor: "grey.800", input: { color: "grey.100" }, ".MuiInputLabel-animated": { color: "grey.400" }, ".MuiInputLabel-animated.Mui-focused": { color: "primary.light" }, borderRadius: 1 }} required fullWidth id="name" label="Name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
              <TextField sx={{ my: 1, backgroundColor: "grey.800", input: { color: "grey.100" }, ".MuiInputLabel-animated": { color: "grey.400" }, ".MuiInputLabel-animated.Mui-focused": { color: "primary.light" }, borderRadius: 1 }} required fullWidth id="email" label="Email Address" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField sx={{ my: 1, backgroundColor: "grey.800", input: { color: "grey.100" }, ".MuiInputLabel-animated": { color: "grey.400" }, ".MuiInputLabel-animated.Mui-focused": { color: "primary.light" }, borderRadius: 1 }} required fullWidth name="password" label="Password" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <TextField
                sx={{ my: 1, backgroundColor: "grey.800", input: { color: "grey.100" }, ".MuiInputLabel-animated": { color: "grey.400" }, ".MuiInputLabel-animated.Mui-focused": { color: "primary.light" }, borderRadius: 1 }}
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }}>
                Update Profile
              </Button>
            </Box>
          </Grid>

          <Grid item md={6} sx={{ pl: mediumPadding, width: "100%" }}>
            <Typography variant="h3" sx={{ mt: 1, pl: mediumPadding, fontSize: 48 * smallFontMultiplier }}>
              My Orders
            </Typography>
            {loadingOrders ? (
              <Loader />
            ) : errorOrders ? (
              <Message variant="error" text={errorOrders} />
            ) : (
              <Grid item xs={12} sx={{ pl: mediumPadding, width: "100%", pt: mediumPaddingTop, mt: 1 }}>
                <List disablePadding>
                  {orders.map((order) => (
                    <ListItem key={order._id} disableGutters sx={{ display: "block" }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography sx={{ color: "grey.400", fontSize: 14 * smallFontMultiplier }}>Order Status: {order.isDelivered ? "Delivered" : order.isPaid ? "Confirmed" : "Not Paid"}</Typography>
                        <Typography sx={{ color: "grey.400", fontSize: 14 * smallFontMultiplier }}>ID: {order._id}</Typography>
                      </Box>
                      <Box sx={{ backgroundColor: "#374151", border: "2px solid", borderColor: "#374151" }}>
                        <Grid container sx={{ m: 1 }}>
                          <Grid item xs={7}>
                            <Typography sx={{ color: "grey.400", fontSize: 16 * smallFontMultiplier }}>Items</Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Typography sx={{ color: "grey.400", textAlign: "center", px: 1, fontSize: 16 * smallFontMultiplier }}>Qty</Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography sx={{ color: "grey.400", textAlign: "right", pr: 2, fontSize: 16 * smallFontMultiplier }}>Price</Typography>
                          </Grid>
                        </Grid>
                        {order.orderItems.map((item) => (
                          <Grid key={item.name} container justifyContent="space-between" alignItems="center" sx={{ backgroundColor: "grey.900", mt: "2px" }}>
                            <Grid item xs={7} sx={{ justifyContent: "center", p: 1 }}>
                              <Typography noWrap sx={{ color: "grey.300", fontSize: 14 * smallFontMultiplier }}>
                                {item.name}{" "}
                                <Typography component="span" sx={{ color: "grey.500", fontSize: 12 * smallFontMultiplier }}>
                                  42x29cm
                                  {item.frame && " - framed"}
                                </Typography>
                              </Typography>
                            </Grid>

                            <Grid item xs={2} sx={{ color: "grey.300", textAlign: "center", pl: 2, fontSize: 16 * smallFontMultiplier }}>
                              {item.qty}
                            </Grid>

                            <Grid item xs={3} sx={{ color: "grey.300", pr: 1, textAlign: "right", fontSize: 16 * smallFontMultiplier }}>
                              ${item.frame ? (item.price + 10).toFixed(2) : item.price.toFixed(2)}
                            </Grid>
                          </Grid>
                        ))}

                        <Grid container justifyContent="space-between" alignItems="center" sx={{ backgroundColor: "grey.900", mt: "2px" }}>
                          <Grid item sm={9} sx={{ justifyContent: "left", p: 1 }}>
                            <Typography sx={{ color: "grey.200", fontSize: 16 * smallFontMultiplier }}>SUBTOTAL</Typography>
                          </Grid>
                          <Grid item sm={3} sx={{ pr: 1, textAlign: "right", fontSize: 16 * smallFontMultiplier }}>
                            ${order.orderItems.reduce((acc, item) => acc + item.qty * (item.frame ? item.price + 10 : item.price), 0).toFixed(2)}
                          </Grid>
                        </Grid>

                        <Grid container justifyContent="space-between" alignItems="center" sx={{ backgroundColor: "grey.900", mt: "2px" }}>
                          <Grid item sm={9} sx={{ justifyContent: "left", p: 1 }}>
                            <Typography sx={{ color: "grey.200", fontSize: 16 * smallFontMultiplier }}>TAX</Typography>
                          </Grid>
                          <Grid item sm={3} sx={{ pr: 1, textAlign: "right", fontSize: 16 * smallFontMultiplier }}>
                            ${Number(order.taxPrice).toFixed(2)}
                          </Grid>
                        </Grid>

                        <Grid container justifyContent="space-between" alignItems="center" sx={{ backgroundColor: "grey.900", mt: "2px" }}>
                          <Grid item sm={9} sx={{ justifyContent: "left", p: 1 }}>
                            <Typography sx={{ color: "grey.200", fontSize: 16 * smallFontMultiplier }}>{Number(order.shippingPrice) === 0 ? "FREE SHIPPING" : "SHIPPING"}</Typography>
                          </Grid>
                          <Grid item sm={3} sx={{ pr: 1, textAlign: "right", fontSize: 16 * smallFontMultiplier }}>
                            ${Number(order.shippingPrice).toFixed(2)}
                          </Grid>
                        </Grid>

                        <Grid container justifyContent="space-between" alignItems="center" sx={{ backgroundColor: "grey.900", mt: "2px" }}>
                          <Grid item sm={9} sx={{ justifyContent: "left", p: 1 }}>
                            <Typography sx={{ color: "grey.200", fontSize: 16 * smallFontMultiplier }}>TOTAL</Typography>
                          </Grid>
                          <Grid item sm={3} sx={{ pr: 1, textAlign: "right", fontSize: 16 * smallFontMultiplier }}>
                            ${Number(order.totalPrice).toFixed(2)}
                          </Grid>
                        </Grid>
                      </Box>
                      <Link to={`/order/${order._id}`} style={{ textDecoration: "none" }}>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }}>
                          Order Details
                        </Button>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilePage;
