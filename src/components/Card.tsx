import { FC, useState } from "react";

import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { Product } from "../types/product";
import { Skeleton } from "@mui/material";

import numeral from "numeral";
import { AddToCart } from "./AddToCart";
import { ProductRating } from "./ProductRating";
import { Link } from "react-router-dom";

const CardContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  position: "relative",
}));

const CardImage = styled("img")(() => ({
  objectFit: "cover",
  objectPosition: "center top",
}));

const CardPrice = styled(Typography)(() => ({
  color: "black",
  fontWeight: "bold",
  fontSize: "1.25rem",
}));

const CardDetail = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
}));

const SkeletonStyled = styled(Skeleton)(({ theme }) => ({
  width: "150px",
  height: "150px",
  [theme.breakpoints.up("sm")]: {
    width: "300px",
    height: "300px",
  },
}));

const CardTitle = styled(Typography)(() => ({
  all: "unset",
  textDecoration: "none",
  color: "#222",
}));

const CardImageWrapper = styled(Link)(() => ({
  position: "absolute",
  left: 0,
  top: 0,
  height: "100%",
  width: "100%",
}));

type ProductCardProps = {
  item: Product;
};

export const ProductCard: FC<ProductCardProps> = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <CardContainer className="embla__slide">
      <CardImageWrapper to={`/product/${item.id}`} />
      <CardImage
        alt={item.title}
        src={item.thumbnail}
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? "block" : "none" }}
      />
      {!imageLoaded && (
        <SkeletonStyled variant="rectangular" aria-label="Image Loading" />
      )}
      <AddToCart product={item} />
      <CardDetail>
        <CardPrice variant="subtitle2" aria-label="Product price">
          R {numeral(item.price).format("0,0.00")}
        </CardPrice>
        <CardTitle variant="subtitle1" aria-label="Product name">
          {item.title}
        </CardTitle>
        <ProductRating product={item} />
      </CardDetail>
    </CardContainer>
  );
};
