import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
// import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingBasketRounded from "@mui/icons-material/ShoppingBasketRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreVert from "@mui/icons-material/MoreVert";
import westStudioLogo from "../assets/logo.svg";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const cart = useSelector((state) => state.cart)
  const {cartItems} = cart;

  const mobileMenuId = "search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link to="/cart">
          <IconButton size="large" color="inherit">
            <Badge badgeContent={cartItems.length && cartItems.reduce((acc, item) => acc + item.qty, 0)} color="error">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
          <p>Cart</p>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="/account">
          <IconButton size="large" color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, pb: 0 }}>
      <AppBar position="static" sx={{ backgroundColor: "#101010", color: "white" }}>
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Box sx={{ display: "flex" }}>
              <img src={westStudioLogo} alt="west studio" />
            </Box>
          </Link>

          {/* <Typography variant="h6" noWrap sx={{ display: { xs: "none", sm: "block" }, mx: '1rem' }}>
            West Studio
          </Typography> */}
          <Search sx={{ backgroundColor: "grey.800", borderRadius: "24px", "&:hover": { backgroundColor: "grey.800" } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <IconButton size="large" color="inherit" sx={{color:'grey.100'}}>
                <Badge badgeContent={cartItems.length && cartItems.reduce((acc, item) => acc + item.qty, 0)} color="info">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            </Link>
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <IconButton size="large" color="inherit" edge="end" sx={{color:'grey.100'}}>
                <AccountCircle />
              </IconButton>
            </Link>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleMobileMenuOpen} color="inherit">
              <MoreVert />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
};

export default Header;
