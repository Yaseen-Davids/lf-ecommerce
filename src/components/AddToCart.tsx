import { FC, useContext } from "react";
import { SnackbarContext } from "../context/SnackbarContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../reducers/cartReducer";
import { Product } from "../types/product";
import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import green from "@mui/material/colors/green";
import ShoppingCart from "@mui/icons-material/ShoppingCart";

const CardButton = styled(Button)(({ theme }) => ({
  display: "flex",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: green[600],
  color: green[800],
  fontWeight: "bold",
  zIndex: 100,
  "&:hover": {
    color: "white",
    backgroundColor: green[600],
  },
  [theme.breakpoints.up("sm")]: {
    gap: "0.25rem",
    padding: "0.5rem 1rem",
  },
}));

type Props = {
  product: Product;
};

export const AddToCart: FC<Props> = ({ product }) => {
  const { setOpen } = useContext(SnackbarContext);
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    setOpen(false);
    // We need to simulate the snackbar message opening on each "Add to cart" function
    await new Promise((res) =>
      setTimeout(() => {
        res(null);
      }, 100)
    );
    setOpen(true);
    dispatch(addToCart(product));
  };

  return (
    <CardButton onClick={handleAddToCart} aria-label="Add Product to Cart">
      + <ShoppingCart style={{ height: "1.25rem" }} /> Add to Cart
    </CardButton>
  );
};
