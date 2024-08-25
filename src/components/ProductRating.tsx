import { FC } from "react";
import { Product } from "../types/product";
import StarIcon from "@mui/icons-material/StarRounded";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

const Rating = styled(Typography)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "0.25rem",

  span: {
    fontSize: "14px",
    color: "#3b3b3b",
  },
}));

type ProductRatingProps = {
  product: Partial<Product>;
};

export const ProductRating: FC<ProductRatingProps> = ({ product }) => {
  return (
    <Rating
      variant="subtitle1"
      aria-label={`Product rating: ${product.rating}`}
    >
      <StarIcon style={{ color: "orange" }} />
      <span>
        {product.rating}{" "}
        {product?.reviews ? <>({product.reviews.length})</> : <></>}
      </span>
    </Rating>
  );
};
