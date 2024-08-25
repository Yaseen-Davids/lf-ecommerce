import "./App.css";
import { alpha, styled } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { CategorySection } from "./components/CategorySection";

const ProductCarouselWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
}));

const Search = styled("div")(({ theme }) => ({
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

function App() {
  return (
    <>
      <SearchProducts />
      <ProductCarouselWrapper>
        <CategorySection category={"mens-watches"} title="Popular Watches" />
        <CategorySection category={"mens-shirts"} title="Popular Mens Shirts" />
        <CategorySection category={"tops"} title="Popular Womens Tops" />
        <CategorySection category={"skin-care"} title="Popular Skin Care" />
        <CategorySection category={"mens-shoes"} title="Popular Mens Shoes" />
        <CategorySection
          category={"womens-shoes"}
          title="Popular Womens Shoes"
        />
        <CategorySection
          category={"womens-jewellery"}
          title="Popular Jewellery"
        />
        <CategorySection
          category={"womens-watches"}
          title="Popular Womens Watches"
        />
      </ProductCarouselWrapper>
    </>
  );
}

const SearchProducts = () => {
  const navigate = useNavigate();

  const handleFocusSearch = () => {
    navigate("/search");
  };

  return (
    <Search onClick={() => handleFocusSearch()}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "Search for products" }}
      />
    </Search>
  );
};

export default App;
