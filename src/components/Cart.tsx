import { FC, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import numeral from "numeral";
import { RootState } from "../store";

import { Product } from "../types/product";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { removeFromCart } from "../reducers/cartReducer";

const CartContainer = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  [theme.breakpoints.up("sm")]: {
    padding: "1rem",
  },
}));

const CardWrapper = styled("div")(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 3fr",
  alignItems: "center",
}));

const CardDetails = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "repeat(2, 1fr)",
  gap: "1rem",
  alignItems: "center",

  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "1fr",
  },
}));

const CardRemoveButton = styled(Button)(({ theme }) => ({
  maxWidth: "40px",
  [theme.breakpoints.down("sm")]: {
    padding: 0,
  },
}));

const CardImage = styled("img")(() => ({
  maxWidth: "60px",
}));

const CardTitle = styled("div")(() => ({
  textAlign: "right",
}));

const CardPrice = styled(Typography)(() => ({
  textAlign: "right",
  fontWeight: "bold",
}));

const CartSummary = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
  textAlign: "right",
  p: {
    fontWeight: "bold",
  },
}));

const CartSummaryRowWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  fontWeight: "bold",
}));

const SHIPPING_AMOUNT = 80.0;

type CartProps = {};

export const Cart: FC<CartProps> = () => {
  const { cart } = useSelector((state: RootState) => state.cart);

  const total = useMemo(
    () => cart.reduce((val, product) => (val += product.price), 0),
    [cart]
  );

  return (
    <CartContainer>
      {cart.length === 0 && (
        <Typography aria-label="Cart empty">No products in cart.</Typography>
      )}
      {cart.map((product) => (
        <Card product={product} />
      ))}
      {cart.length > 0 && (
        <CartSummary aria-label="Cart Summary">
          <CartSummaryRow title="Subtotal" amount={total} />
          <CartSummaryRow title="Shipping" amount={SHIPPING_AMOUNT} />
          <CartSummaryRow
            summary
            title="Total"
            amount={total + SHIPPING_AMOUNT}
          />
        </CartSummary>
      )}
    </CartContainer>
  );
};

type CartSummaryRowProps = {
  summary?: boolean;
  title: string;
  amount: number;
};

const CartSummaryRow: FC<CartSummaryRowProps> = ({
  summary,
  title,
  amount,
}) => (
  <CartSummaryRowWrapper>
    <Typography
      aria-label={`Cart Summary ${title}`}
      variant={summary ? "h6" : "subtitle1"}
    >
      {title}
    </Typography>
    <Typography
      aria-label={`Cart ${title} amount`}
      variant={summary ? "h6" : "subtitle1"}
    >
      R {numeral(amount).format("0,0.00")}
    </Typography>
  </CartSummaryRowWrapper>
);

type CardProps = {
  product: Product;
};

const Card: FC<CardProps> = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <>
      <CardWrapper>
        <div>
          <CardRemoveButton
            color="error"
            aria-label="Cart remove product"
            onClick={() => dispatch(removeFromCart(product.id))}
          >
            <DeleteIcon />
          </CardRemoveButton>
        </div>
        <div>
          <CardImage src={product.thumbnail} alt={product.title} />
        </div>
        <CardDetails>
          <CardTitle aria-label="Cart product title">{product.title}</CardTitle>
          <CardPrice aria-label="Cart product price">
            R {numeral(product.price).format("0,0.00")}
          </CardPrice>
        </CardDetails>
      </CardWrapper>
      <Divider />
    </>
  );
};
