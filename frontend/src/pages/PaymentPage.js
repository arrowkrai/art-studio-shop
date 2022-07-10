import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Box, Button, Container, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { saveShippingAddress, savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Title from "../components/Title";

const PaymentPage = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <Box sx={{ minHeight: "calc(100vh - 128px)", py: 4, px: 1, mt: 0, backgroundColor: "#171717", color: "grey.100" }}>
      <Title title="Payment Method" />
      <Container maxWidth="md">
        <CheckoutSteps step={1} />
      </Container>
      <Container maxWidth="sm">
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Typography variant="h4" sx={{ my: 2 }}>
            Payment Method
          </Typography>

          <FormControl>
            <RadioGroup defaultValue="PayPal" name="payment-method" onChange={(e) => setPaymentMethod(e.target.value)}>
              <FormControlLabel value="PayPal" control={<Radio />} label="PayPal" />
            </RadioGroup>
          </FormControl>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Continue
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default PaymentPage;
