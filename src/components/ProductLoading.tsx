import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import { styled } from "@mui/material";

const SkeletonStyled = styled(Skeleton)(({ theme }) => ({
  width: "150px",
  height: "150px",
  [theme.breakpoints.up("sm")]: {
    width: "300px",
    height: "300px",
  },
}));

export const ProductLoading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
      role="status"
      aria-label="Loading product details"
      aria-busy="true"
    >
      <SkeletonStyled
        variant="rectangular"
        aria-label="Loading product image"
      />
      <Box sx={{ pt: 0.5, height: "100px" }}>
        <Skeleton width={"50%"} aria-label="Loading product name" />
        <Skeleton width={"75%"} aria-label="Loading product price" />
      </Box>
    </Box>
  );
};
