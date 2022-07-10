import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Box, Button, Container, FormControl, TextField, Typography } from "@mui/material";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Title from "../components/Title";

const ShippingPage = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <Box sx={{ minHeight: "calc(100vh - 128px)", py: 4, px: 1, mt: 0, backgroundColor: "#171717", color: "grey.100" }}>
      <Title title="Shipping" />
      <Container maxWidth="md">
        <CheckoutSteps step={0} />
      </Container>
      <Container maxWidth="sm">
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Typography variant="h4" sx={{ my: 2 }}>
            Shipping
          </Typography>

          <TextField
            sx={{
              my: 1,
              backgroundColor: "grey.800",
              input: { color: "grey.100" },
              ".MuiInputLabel-animated": { color: "grey.400" },
              ".MuiInputLabel-animated.Mui-focused": { color: "primary.light" },
              borderRadius: 1,
            }}
            required
            fullWidth
            color="info"
            id="address"
            label="Address"
            name="address"
            autoFocus
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            sx={{
              my: 1,
              backgroundColor: "grey.800",
              input: { color: "grey.100" },
              ".MuiInputLabel-animated": { color: "grey.400" },
              ".MuiInputLabel-animated.Mui-focused": { color: "primary.light" },
              borderRadius: 1,
            }}
            required
            fullWidth
            color="info"
            id="city"
            label="City"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            sx={{
              my: 1,
              backgroundColor: "grey.800",
              input: { color: "grey.100" },
              ".MuiInputLabel-animated": { color: "grey.400" },
              ".MuiInputLabel-animated.Mui-focused": { color: "primary.light" },
              borderRadius: 1,
            }}
            required
            fullWidth
            color="info"
            id="postalCode"
            label="Postal Code"
            name="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <TextField
            sx={{
              my: 1,
              backgroundColor: "grey.800",
              input: { color: "grey.100" },
              ".MuiInputLabel-animated": { color: "grey.400" },
              ".MuiInputLabel-animated.Mui-focused": { color: "primary.light" },
              borderRadius: 1,
            }}
            required
            fullWidth
            color="info"
            id="country"
            label="Country"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ my: 1, textTransform: "none" }}>
            Continue
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ShippingPage;
