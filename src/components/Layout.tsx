import { ReactNode, FC } from "react";
import PrimarySearchAppBar from "./Appbar";
import { AppBar, Box, styled } from "@mui/material";

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem",
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

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <PrimarySearchAppBar />
      <Wrapper>{children}</Wrapper>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ position: "sticky", bottom: 0, left: 0 }}>
          <Wrapper></Wrapper>
        </AppBar>
      </Box>
    </div>
  );
};
