import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import ShoppingCart from "@mui/icons-material/ShoppingCart";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ResuableDialog } from "./Dialog";
import { Cart } from "./Cart";
import { styled } from "@mui/material";
import { Link } from "react-router-dom";

const Wrapper = styled("div")(({ theme }) => ({
  marginLeft: "0",
  marginRight: "0",
  [theme.breakpoints.up("md")]: {
    marginLeft: "100px",
    marginRight: "100px",
  },
  [theme.breakpoints.up("lg")]: {
    marginLeft: "200px",
    marginRight: "200px",
  },
}));

const PrimarySearchAppBar = () => {
  const [openCart, toggleCart] = useState(false);

  const { cart } = useSelector((state: RootState) => state.cart);

  return (
    <>
      <ResuableDialog
        title="Cart"
        open={openCart}
        handleClose={() => toggleCart(!openCart)}
      >
        <Cart />
      </ResuableDialog>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Wrapper>
            <Toolbar>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  aria-label="Company Name"
                >
                  LittleFish
                </Typography>
              </Link>
              <Box sx={{ flexGrow: 1 }} />
              <Box>
                <IconButton
                  size="large"
                  aria-label="View Cart"
                  color="inherit"
                  onClick={() => toggleCart(true)}
                >
                  <Badge badgeContent={cart.length} color="error">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Box>
            </Toolbar>
          </Wrapper>
        </AppBar>
      </Box>
    </>
  );
};

export default PrimarySearchAppBar;
