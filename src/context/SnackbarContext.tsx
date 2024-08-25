import { Snackbar, SnackbarCloseReason } from "@mui/material";
import { createContext, ReactNode, useMemo, useState } from "react";

// example use of React Context API

type SnackbarContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  open: false,
  setOpen: () => {},
});

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const handleClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const value = useMemo(
    () => ({
      open,
      setOpen,
    }),
    [open]
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        color="success"
        autoHideDuration={3000}
        onClose={handleClose}
        message={"Product added to cart!"}
      />
    </SnackbarContext.Provider>
  );
};
