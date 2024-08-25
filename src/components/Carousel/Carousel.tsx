import { styled, Typography } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./usePreviousButtons";
import { FC } from "react";
import { ProductCard } from "../Card";
import { useGetAllProductsQuery } from "../../services/products";
import { ProductLoading } from "../ProductLoading";

const CarouselWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "2rem",
  "& .embla__slide": {
    flex: "0 0 20rem",
    [theme.breakpoints.down("sm")]: {
      flex: "0 0 10rem",
    },
    [theme.breakpoints.up("sm")]: {
      flex: "0 0 20rem",
    },
  },
}));

type CarouselProps = {
  category: string;
};

export const Carousel: FC<CarouselProps> = ({ category }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: "auto" });
  const { data, isFetching, isError } = useGetAllProductsQuery(category);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  if (isError) {
    return (
      <Typography aria-label="Error products not found">
        Error: No Products Found
      </Typography>
    );
  }

  return (
    <section
      className="embla"
      style={{ position: "relative" }}
      aria-label="Product Carousel"
    >
      {!isFetching && (
        <>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </>
      )}
      <div
        ref={emblaRef}
        className="embla__viewport"
        style={{ display: "relative" }}
      >
        <CarouselWrapper aria-live="polite" className="embla__container">
          {(isFetching ? Array.from(new Array(10)) : data || []).map(
            (product: any, index: number) =>
              product ? (
                <ProductCard key={product.title} item={product} />
              ) : (
                <ProductLoading key={`loading-${index}`} />
              )
          )}
        </CarouselWrapper>
      </div>
    </section>
  );
};
