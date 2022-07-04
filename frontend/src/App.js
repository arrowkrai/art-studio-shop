import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
// TODO: Implement Router
// import { BrowserRouter as Router, Route} from 'react-router-dom'

const theme = createTheme({
  typography: {
    fontFamily: `"Work Sans", "Roboto", sans-serif`,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* <Router>
        <Header />
        <Route path='/' component={HomePage} exact />
        <Route path='/product/:id' component={ProductPage} exact />
        <Footer />
      </Router> */}

      <Header />
      {/* <HomePage /> */}
      <ProductPage />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
