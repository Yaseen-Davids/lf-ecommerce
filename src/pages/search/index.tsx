import { FC, useEffect, useRef, useState } from "react";
import { alpha, styled } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetProductByNameQuery } from "../../services/products";
import { ProductCard } from "../../components/Card";
import { ProductLoading } from "../../components/ProductLoading";

const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
}));

const SearchTools = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
}));

const SearchWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "0.25rem",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  width: "100%",
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
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const ProductsWrapper = styled("div")(({ theme }) => ({
  display: "grid",
  gap: "2rem",
  gridTemplateColumns: "repeat(2, 1fr)",

  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
}));

const ShowMoreWrapper = styled("div")(({}) => ({
  display: "flex",
  flexDirection: "row",
  "& button": {
    width: "100%",
    backgroundColor: "#7b7b7b",
    "&:hover": {
      backgroundColor: "#6b6b6b",
    },
  },
}));

const StyledAutocomplete = styled(Autocomplete)(() => ({
  width: "200px",
}));

type DebounceFunction = (...args: any[]) => void;

const debounce = (func: DebounceFunction, wait: number): DebounceFunction => {
  let timeout: NodeJS.Timeout;

  return (...args: any[]): void => {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const sortOptions: SortOptionsType[] = [
  { display: "Rating: High to Low", sort: "rating", order: "desc" },
  { display: "Rating: Low to High", sort: "rating", order: "asc" },
  { display: "Price: Low to High", sort: "price", order: "asc" },
  { display: "Price: High to Low", sort: "price", order: "desc" },
  { display: "Name: A-Z", sort: "title", order: "asc" },
  { display: "Name: Z-A", sort: "title", order: "desc" },
];

type SortOptionsType = {
  display: string;
  sort: string;
  order: string;
};

type SearchProps = {};

export const Search: FC<SearchProps> = () => {
  const searchRef = useRef<HTMLInputElement | null>(null);

  const [searchLimit, setSearchLimit] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortValue, setSortValue] = useState<SortOptionsType>(sortOptions[0]);

  const { data, isLoading, isFetching } = useGetProductByNameQuery({
    search: searchQuery,
    limit: searchLimit,
    sort: sortValue.sort,
    order: sortValue.order,
  });

  const showMore = () => {
    setSearchLimit((prev) => (prev += 10));
  };

  useEffect(() => {
    if (searchRef.current && searchRef.current.children.length > 0) {
      (searchRef?.current?.children[0] as HTMLInputElement).focus();
    }
  }, []);

  return (
    <Container>
      <SearchWrapper>
        <SearchIconWrapper>
          {isFetching ? (
            <CircularProgress color="info" size="20px" />
          ) : (
            <SearchIcon />
          )}
        </SearchIconWrapper>
        <StyledInputBase
          ref={searchRef}
          placeholder="Search…"
          inputProps={{ "aria-label": "Search for Products" }}
          onChange={debounce((e) => setSearchQuery(e.target.value), 300)}
        />
      </SearchWrapper>
      <SearchTools>
        <StyledAutocomplete
          disabled={isFetching}
          id="grouped-demo"
          disableClearable
          value={sortValue}
          options={sortOptions}
          aria-label="Sort products by"
          getOptionLabel={(option: any) => option.display}
          onChange={(_, newValue: any) => setSortValue(newValue)}
          renderInput={(params) => <TextField {...params} label="Sort" />}
        />
        <div>
          {searchQuery !== "" && !isFetching && !isLoading ? (
            <p aria-live="polite">
              {data?.total} results for "{searchQuery}"
            </p>
          ) : (
            <p aria-live="polite">{data?.total} Products</p>
          )}
        </div>
      </SearchTools>
      <ProductsWrapper aria-live="polite">
        {(isFetching ? Array.from(new Array(10)) : data?.products || []).map(
          (product: any, index: number) =>
            product ? (
              <ProductCard key={`${product.title}-${index}`} item={product} />
            ) : (
              <ProductLoading key={`loading-${index}`} />
            )
        )}
      </ProductsWrapper>
      {searchLimit < (data?.total || 0) && (
        <ShowMoreWrapper>
          <Button
            color="success"
            variant="contained"
            onClick={showMore}
            aria-label="View more products"
          >
            View more products
          </Button>
        </ShowMoreWrapper>
      )}
    </Container>
  );
};
