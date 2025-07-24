import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";

import { Button } from "@mui/material";
import { useState, type FC } from "react";

interface NewPatientDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

const formSteps = ["personal-information", "medical-record", "consent"];

const NewPatientDialog: FC<NewPatientDialogProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      birthday: "",
      age: undefined,
      civilStatus: "",
      occupation: "",
      physician: "",
      referredBy: "",
    },
  });
  const handleSave = () => {
    // Logic to save the new patient data
    const data = {};
    onSave(data);
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          style: {
            minWidth: "400px",
          },
        },
      }}
    >
      <DialogTitle>Add New Patient Record</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button color="error" variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button color="success" variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewPatientDialog;
