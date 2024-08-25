import { Divider, styled, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../services/products";
import { AddToCart } from "../../components/AddToCart";
import { ProductRating } from "../../components/ProductRating";
import { format } from "date-fns/format";
import { Review } from "../../types/product";

const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
}));

const ProductWrapper = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateRows: "repeat(2, min-content)",
  gridTemplateColumns: "1fr",
  gap: "2rem",
  justifyItems: "center",

  [theme.breakpoints.up("md")]: {
    padding: "1rem",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "1fr",
    gap: "1rem",
  },
}));

const ProductDetail = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
}));

const ProductImageWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "1rem",
  flexDirection: "column-reverse",

  [theme.breakpoints.up("lg")]: {
    flexDirection: "row",
  },
}));

const ProductImage = styled("img")(() => ({
  objectFit: "cover",
  objectPosition: "center top",
  border: "1px solid #e0e0e0",
}));

const SmallImage = styled("img")(() => ({
  cursor: "pointer",
  border: "1px solid #e0e0e0",
  transition: "ease-in-out 0.25s",
  "&:hover": {
    border: "1px solid #3144b0",
  },
}));

const SkeletonStyled = styled(Skeleton)(({ theme }) => ({
  width: "150px",
  height: "150px",

  [theme.breakpoints.up("sm")]: {
    width: "300px",
    height: "300px",
  },
}));

const SmallImagesWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  overflowX: "auto",
  overflowY: "auto",
  height: "105px",
  maxWidth: "calc(100vw - 30px)",
  gap: "0.15rem",

  [theme.breakpoints.up("lg")]: {
    flexDirection: "column",
    height: "300px",
  },
}));

const LoadingWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
}));

type ProductProps = {};

export const Product: FC<ProductProps> = () => {
  const { productId } = useParams();

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const { data, isFetching, isError } = useGetProductByIdQuery({
    id: productId ?? "",
  });

  if (isError) {
    return (
      <Typography variant="h5" sx={{ height: "100vh" }} aria-label="Error">
        An error has occurred. Please try again later.
      </Typography>
    );
  }

  if (isFetching)
    return (
      <LoadingWrapper>
        <ProductWrapper>
          <div>
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={"100%"}
              aria-label="Loading product image"
            />
          </div>
          <ProductDetail>
            <Skeleton
              variant="rectangular"
              width={"100%"}
              aria-label="Loading product title"
            />
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={"250px"}
              aria-label="Loading product description"
            />
            <Skeleton
              variant="rectangular"
              width={"10%"}
              aria-label="Loading product rating"
            />
            <Skeleton
              variant="rectangular"
              width={"100%"}
              aria-label="Loading product price"
            />
          </ProductDetail>
        </ProductWrapper>
        <ProductDetail>
          <Skeleton
            variant="rectangular"
            aria-label="Loading shipping information"
          />
          <Skeleton
            variant="rectangular"
            width={"40%"}
            aria-label="Loading additional information"
          />
          <Skeleton
            variant="rectangular"
            width={"40%"}
            aria-label="Loading more information"
          />
        </ProductDetail>
        <ProductDetail>
          <Skeleton variant="rectangular" aria-label="Loading reviews" />
          <Skeleton
            variant="rectangular"
            width={"40%"}
            aria-label="Loading review author"
          />
          <Skeleton
            variant="rectangular"
            width={"40%"}
            aria-label="Loading review content"
          />
        </ProductDetail>
      </LoadingWrapper>
    );

  return (
    <Container>
      <ProductWrapper>
        <ProductImageWrapper>
          <SmallImagesWrapper>
            {data?.images.map((image, index) => (
              <SmallImage
                key={`small-image-${index}`}
                src={image}
                height={"100px"}
                width={"100px"}
                onClick={() => setImageIndex(index)}
                aria-label={`Thumbnail image ${index + 1}`}
              />
            ))}
          </SmallImagesWrapper>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ProductImage
              alt={data?.title}
              src={data?.images[imageIndex]}
              onLoad={() => setImageLoaded(true)}
              sx={{ display: imageLoaded ? "block" : "none", height: "300px" }}
              aria-label={`Main image of ${data?.title}`}
            />
            {!imageLoaded && (
              <SkeletonStyled
                variant="rectangular"
                aria-label="Loading main product image"
              />
            )}
          </div>
        </ProductImageWrapper>
        <ProductDetail>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold" }}
            aria-label="Product title"
          >
            {data?.title}
          </Typography>
          <Typography aria-label="Product description">
            {data?.description}
          </Typography>
          <ProductRating
            product={data!}
            aria-label={`Product rating: ${data?.rating}`}
          />
          <Divider />
          <Typography
            sx={{ fontWeight: "bold" }}
            variant="h6"
            aria-label="Shipping information"
          >
            {data?.shippingInformation}
          </Typography>
          <AddToCart product={data!} aria-label="Add to cart button" />
        </ProductDetail>
      </ProductWrapper>
      <ProductReviews reviews={data?.reviews!} />
    </Container>
  );
};

type ProductReviewProps = {
  reviews: Review[];
};

const ProductReviews: FC<ProductReviewProps> = ({ reviews }) => (
  <div>
    <Typography
      variant="h5"
      sx={{ fontWeight: "bold" }}
      aria-label="Reviews section"
    >
      Reviews
    </Typography>
    {reviews.length === 0 && (
      <Typography aria-label="No reviews available">
        No reviews submitted.
      </Typography>
    )}
    {reviews.map((review, index) => (
      <div key={index}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
            gap: "0.5rem",
          }}
          aria-label={`Review ${index + 1}`}
        >
          <ProductRating
            product={{ rating: review.rating.toString() }}
            aria-label={`Rating: ${review.rating}`}
          />
          <Typography
            sx={{ fontWeight: "bold" }}
            aria-label={`Reviewer: ${review.reviewerName}`}
          >
            {review.reviewerName} -{" "}
            {format(new Date(review.date), "dd MMM yyyy")}
          </Typography>
          <Typography aria-label={`Review comment`}>
            {review.comment}
          </Typography>
        </div>
        <Divider aria-hidden="true" />
      </div>
    ))}
  </div>
);
