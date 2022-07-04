import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Footer from "./components/Footer";
import Header from "./components/Header";

const theme = createTheme({
  typography: {
    fontFamily: `"Work Sans", "Roboto", sans-serif`,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Typography variant="h1">Welcome to the West Studio Art Shop</Typography>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
