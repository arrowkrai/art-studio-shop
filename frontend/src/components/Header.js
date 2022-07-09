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
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { Snackbar, Tooltip } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import InventoryIcon from "@mui/icons-material/Inventory";

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
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setOpenSnackbar(true);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} {...props} />;
  });

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
        <Link onClick={handleMobileMenuClose} to="/cart" style={{ textDecoration: "none", color: "black" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={cartItems.length && cartItems.reduce((acc, item) => acc + item.qty, 0)} color="info">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
            <Typography sx={{ fontSize: "1.3rem" }}>Cart</Typography>
          </Box>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          onClick={handleMobileMenuClose}
          to={userInfo ? "/profile" : "/login"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <IconButton size="large" color="inherit">
              <AccountCircle />
            </IconButton>
            <Typography sx={{ fontSize: "1.3rem" }}>{userInfo ? "Profile" : "Login"}</Typography>
          </Box>
        </Link>
      </MenuItem>
      {userInfo && (
        <MenuItem>
          <Link
            to="/"
            onClick={() => {
              handleLogout();
              handleMobileMenuClose();
            }}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <IconButton size="large" color="inherit">
                <LogoutIcon />
              </IconButton>
              <Typography sx={{ fontSize: "1.3rem" }}>Logout</Typography>
            </Box>
          </Link>
        </MenuItem>
      )}
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
          <Search
            sx={{
              backgroundColor: "grey.800",
              borderRadius: "24px",
              ml: 2,
              "&:hover": { backgroundColor: "grey.800" },
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {userInfo && userInfo.isAdmin && (
              <Box>
                <Tooltip title="User List">
                  <Link to="/admin/userlist" style={{ textDecoration: "none" }}>
                    <IconButton size="large" color="error" sx={{ color: "error" }}>
                      <SupervisorAccountIcon />
                    </IconButton>
                  </Link>
                </Tooltip>
                <Tooltip title="Product List">
                  <Link to="/admin/productlist" style={{ textDecoration: "none" }}>
                    <IconButton size="large" color="error" sx={{ color: "error" }}>
                      <InventoryIcon />
                    </IconButton>
                  </Link>
                </Tooltip>
                <Tooltip title="Order List">
                  <Link to="/admin/orderlist" style={{ textDecoration: "none" }}>
                    <IconButton size="large" color="error" sx={{ color: "error" }}>
                      <AdminPanelSettingsIcon />
                    </IconButton>
                  </Link>
                </Tooltip>
              </Box>
            )}

            <Tooltip title="Cart">
              <Link to="/cart" style={{ textDecoration: "none" }}>
                <IconButton size="large" color="inherit" sx={{ color: "grey.100" }}>
                  <Badge
                    badgeContent={cartItems.length && cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    color="info"
                  >
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                </IconButton>
              </Link>
            </Tooltip>

            <Tooltip title={userInfo ? "Profile" : "Login"}>
              <Link to={userInfo ? "/profile" : "/login"} style={{ textDecoration: "none" }}>
                <IconButton size="large" color="inherit" edge={userInfo ? false : "end"} sx={{ color: "grey.100" }}>
                  <AccountCircle />
                </IconButton>
              </Link>
            </Tooltip>

            {userInfo && (
              <Tooltip title="Logout">
                <Link onClick={handleLogout} to="/" style={{ textDecoration: "none" }}>
                  <IconButton size="large" color="inherit" edge="end" sx={{ color: "grey.100" }}>
                    <LogoutIcon />
                  </IconButton>
                </Link>
              </Tooltip>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleMobileMenuOpen} color="inherit">
              <MoreVert />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Logout Successful!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Header;
