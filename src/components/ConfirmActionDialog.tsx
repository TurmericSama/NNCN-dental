import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import type { FC } from "react";

/**
 * ConfirmActionDialog component to confirm user actions.
 * It can be used for actions like deleting a record, submitting a form, etc.
 *
 * @param open - Controls whether the dialog is open.
 * @param onClose - Callback fired when the dialog should be closed.
 * @param onConfirm - Callback fired when the user confirms the action.
 * @param confirmationTitle - Optional title to display in the dialog.
 * @param confirmationMessage - Optional message to display in the dialog content.
 * @returns JSX.Element
 */

interface ConfirmActionDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmationTitle?: string;
  confirmationMessage?: string | React.ReactNode;
  children?: React.ReactNode;
}

const ConfirmActionDialog: FC<ConfirmActionDialogProps> = ({
  open,
  onClose,
  onConfirm,
  confirmationTitle,
  confirmationMessage,
  children,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{confirmationTitle}</DialogTitle>
      <DialogContent>{children || confirmationMessage}</DialogContent>
      <DialogActions>
        <Button color="error" variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" onClick={onConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmActionDialog;
export type { ConfirmActionDialogProps };
