import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import { BrowserRouter, Routes, Route, useParams, useLocation } from "react-router-dom";

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
  const {id} = useParams();
  const {search} = useLocation();

  return <CartPage id={id} search={search} />
}

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
        </Routes>

        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
