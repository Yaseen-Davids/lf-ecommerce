import { FC, ReactNode } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

type DialogProps = {
  title: string;
  open: boolean;
  handleClose(): void;
  children: ReactNode;
};

export const ResuableDialog: FC<DialogProps> = ({
  title,
  open,
  children,
  handleClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title" aria-label="Dialog title">
        {title}
      </DialogTitle>
      <DialogContent aria-label="Dialog details">{children}</DialogContent>
    </Dialog>
  );
};
