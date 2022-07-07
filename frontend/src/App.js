import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import { BrowserRouter, Routes, Route, useParams, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";

const theme = createTheme({
  typography: {
    fontFamily: `"Work Sans", "Roboto", sans-serif`,
  },
});

const ProductPageWrapper = () => {
  const { id } = useParams();
  return <ProductPage id={id} />;
};

const CartPageWrapper = () => {
  const { id } = useParams();
  const { search } = useLocation();
  return <CartPage id={id} search={search} />;
};

const LoginPageWrapper = () => {
  const {search} = useLocation();
  return <LoginPage search={search} />;
};

const RegisterPageWrapper = () => {
  const {search} = useLocation();
  return <RegisterPage search={search} />;
};

const ProfilePageWrapper = () => {
  const {search} = useLocation();
  return <ProfilePage search={search} />;
};

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPageWrapper />} />
          <Route path="/cart/:id" element={<CartPageWrapper />} />
          <Route path="/cart" element={<CartPageWrapper />} />
          <Route path="/login/*" element={<LoginPageWrapper />} />
          <Route path="/register" element={<RegisterPageWrapper />} />
          <Route path="/profile" element={<ProfilePageWrapper />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/payment" element={<PaymentPage />} />

        </Routes>

        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
