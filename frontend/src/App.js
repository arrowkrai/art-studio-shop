import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: `"Work Sans", "Roboto", sans-serif`,
  },
});

const ProductPageWrapper = () => {
  const { id } = useParams();
  return <ProductPage id={id} />;
};

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPageWrapper />} />
        </Routes>

        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
