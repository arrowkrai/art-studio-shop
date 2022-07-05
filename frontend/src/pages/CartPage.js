import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { FormControl, List, ListItem, MenuItem, Select } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { FaTrash } from "react-icons/fa";

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
    console.log("checkout");
    navigate("/login?redirect=shipping");
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(id, qty, frame));
    }
  }, [dispatch, productId, qty, frame]);

  return (
    <Box sx={{ py: 4, px: 5, mt: 0, backgroundColor: "#171717", color: "grey.100" }}>
      <Container maxWidth="">
        {/* <Link to="/" style={{ textDecoration: "none" }}>
          <Box sx={{ display: "flex" }}>
            <ArrowBackIcon sx={{ color: "grey.100", mr: 1 }} />
            <Typography sx={{ color: "grey.100" }}>Go Back</Typography>
          </Box>
        </Link> */}
        <Typography variant="h4" sx={{ my: 3 }}>
          Shopping Cart
        </Typography>
        {cartItems.length === 0 ? (
          <Typography>Your cart is empty</Typography>
        ) : (
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.product}>
                <Grid container>
                  <Grid item md={2}>
                    <Link to={`/product/${item.product}`}>
                      <img src={item.image} alt={item.name} style={{ width: "100%" }} />
                    </Link>
                  </Grid>
                  <Grid item md={3}>
                    <Typography sx={{ color: "grey.100" }}>{item.name}</Typography>
                    <Typography sx={{ color: "grey.500" }}>
                      Add Frame:{" "}
                      {item.frame ? (
                        <Typography component="span" sx={{ color: "grey.100" }}>
                          Yes
                        </Typography>
                      ) : (
                        "No"
                      )}
                    </Typography>
                  </Grid>
                  <Grid item md={2}>
                    ${item.frame ? item.price + 10 : item.price}
                  </Grid>
                  <Grid item md={2}>
                    <FormControl size="small" variant="outlined" sx={{ width: 60 }}>
                      <Select
                        sx={{ backgroundColor: "#374151", color: "grey.100", icon: { fill: "white" } }}
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
                  <Grid item md={2}>
                    <IconButton onClick={() => removeFromCartHandler(item.product)} size="small" sx={{ color: "grey.100" }}>
                      <FaTrash />
                    </IconButton>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
            <ListItem>
              <Grid container>
                <Grid item md={2}>
                  <Typography>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</Typography>$
                  {cartItems.reduce((acc, item) => acc + item.qty * (item.frame ? item.price + 10 : item.price), 0).toFixed(2)}
                </Grid>
                <Grid item md={2}>
                  {cartItems.length > 0 ? (
                    <Button size="large" variant="contained" sx={{ textTransform: "none" }} onClick={checkoutHandler}>
                      <ShoppingCartCheckoutIcon style={{ marginRight: "5px" }} />
                      Proceed To Checkout
                    </Button>
                  ) : (
                    <Button size="large" variant="contained" disabled sx={{ textTransform: "none", "&.Mui-disabled": { backgroundColor: "grey.800", color: "grey.300" } }}>
                      Cart is empty
                    </Button>
                  )}
                </Grid>
              </Grid>
            </ListItem>
          </List>
        )}
      </Container>
    </Box>
  );
};

export default CartPage;
