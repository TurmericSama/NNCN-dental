import type { FC } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import {
  Grid,
  Box,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  Typography,
} from "@mui/material";

import ConfirmActionDialog from "@components/ConfirmActionDialog";
import useToggle from "@lib/useToggle";
import { calculateAgeFromBirthday } from "@lib/getAgeFromBirthDate";
import subtractFromCurrentDate from "@lib/dateUtils";

const CIVIL_STATUS_OPTIONS = ["Single", "Married", "Divorced", "Widowed"];

const newPatientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(10, "Address is required"),
  phone: z.string().min(8, { message: "Enter a valid mobile or phone number" }),
  birthday: z.string().min(1, "Birthday is required"),
  age: z
    .number()
    .min(0, "Age is required")
    .max(120, "Enter realistic age")
    .default(0),
  civilStatus: z.enum(CIVIL_STATUS_OPTIONS, {
    error: () => ({
      message: "Civil Status is required",
    }),
  }),
  occupation: z.string().optional(),
  physician: z.string().min(1, "Physician name is required"),
  referredBy: z.string().optional(),
});

const NewPatientForm: FC = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(newPatientSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      birthday: "",
      age: 0,
      civilStatus: "Single",
      occupation: "",
      physician: "",
      referredBy: "",
    },
  });

  const birthday = watch("birthday");
  useEffect(() => {
    if (birthday) {
      const age = calculateAgeFromBirthday(birthday);
      setValue("age", age);
    }
  }, [birthday, setValue]);

  const [openCancelMessage, toggleCancelMesssage] = useToggle();

  const onSave = (data: any) => {
    // Handle save logic here
    console.log("New patient data:", data);
  };

  const onCancel = () => {
    toggleCancelMesssage();
  };

  const onConfirmCancel = () => {
    toggleCancelMesssage();
    navigate("/patients");
  };

  return (
    <>
      <Box
        sx={{
          p: { xs: 2, sm: 2, md: 4 },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          fontWeight="bold"
          variant="h4"
          fontSize={{
            xs: "1.5rem",
            sm: "2rem",
            md: "2.5rem",
          }}
        >
          New Patient Form
        </Typography>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <Grid container spacing={2} sx={{ mt: 1, height: "auto" }}>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.name} fullWidth>
                    <TextField
                      {...field}
                      id="name"
                      label="Name"
                      variant="standard"
                      required
                      size="small"
                      fullWidth
                    />
                    {errors["name"] && (
                      <FormHelperText error>
                        {errors["name"].message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 10, lg: 10 }}>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.address} fullWidth>
                    <TextField
                      {...field}
                      id="address"
                      label="Address"
                      variant="standard"
                      size="small"
                      required
                      fullWidth
                    />
                    {errors["address"] && (
                      <FormHelperText error>
                        {errors["address"].message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 4 }}>
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.phone} fullWidth>
                    <TextField
                      {...field}
                      id="phone"
                      label="Phone"
                      variant="standard"
                      size="small"
                      required
                      type="tel"
                      fullWidth
                    />
                    {errors["phone"] && (
                      <FormHelperText error>
                        {errors["phone"].message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 2, lg: 2 }}>
              <Controller
                name="birthday"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.birthday} fullWidth>
                    <TextField
                      {...field}
                      id="birthday"
                      label="Birthday"
                      variant="standard"
                      size="small"
                      required
                      type="date"
                      slotProps={{
                        inputLabel: { shrink: true },
                        htmlInput: {
                          min: subtractFromCurrentDate(7, "years"),
                        },
                      }}
                      fullWidth
                    />
                    {errors["birthday"] && (
                      <FormHelperText error>
                        {errors["birthday"].message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 1, lg: 1 }}>
              <Controller
                name="age"
                control={control}
                render={({ field }) => (
                  <FormControl error={!!errors.age} fullWidth>
                    <TextField
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.slice(0, 3); // limit to 3 chars
                        field.onChange(value ? parseInt(value, 10) : undefined);
                      }}
                      id="age"
                      label="Age"
                      variant="standard"
                      size="small"
                      type="number"
                      fullWidth
                      slotProps={{
                        htmlInput: {
                          maxLength: 3,
                          readOnly: true,
                          disabled: true,
                        },
                      }}
                    />
                    {errors["age"] && (
                      <FormHelperText error>
                        {errors["age"].message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 2, lg: 2 }}>
              <Controller
                name="civilStatus"
                control={control}
                defaultValue={CIVIL_STATUS_OPTIONS[0]}
                render={({ field }) => (
                  <FormControl
                    error={!!errors.civilStatus}
                    variant="standard"
                    fullWidth
                  >
                    <InputLabel id="civilStatus-label">Civil Status</InputLabel>
                    <Select
                      {...field}
                      labelId="civilStatus-label"
                      id="civilStatus"
                      label="Civil Status"
                      sx={{ minWidth: 120 }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Single">Single</MenuItem>
                      <MenuItem value="Married">Married</MenuItem>
                      <MenuItem value="Widowed">Widowed</MenuItem>
                      <MenuItem value="Divorced">Divorced</MenuItem>
                    </Select>
                    {errors["civilStatus"] && (
                      <FormHelperText error>
                        {errors["civilStatus"].message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Controller
                name="occupation"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.occupation} fullWidth>
                    <TextField
                      {...field}
                      id="occupation"
                      label="Occupation"
                      variant="standard"
                      size="small"
                      fullWidth
                    />
                    {errors["occupation"] && (
                      <FormHelperText error>
                        {errors["occupation"].message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3, lg: 3 }}>
              <Controller
                name="physician"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.physician} fullWidth>
                    <TextField
                      {...field}
                      id="physician"
                      label="Physician"
                      variant="standard"
                      required
                      size="small"
                      fullWidth
                    />
                    {errors["physician"] && (
                      <FormHelperText error>
                        {errors["physician"].message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3, lg: 3 }}>
              <Controller
                name="referredBy"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.referredBy} fullWidth>
                    <TextField
                      {...field}
                      id="referredBy"
                      label="Referred By"
                      variant="standard"
                      size="small"
                      fullWidth
                    />
                    {errors["referredBy"] && (
                      <FormHelperText error>
                        {errors["referredBy"].message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button variant="outlined" color="error" onClick={onCancel}>
              Back To Patients
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isValid}
              onClick={handleSubmit(onSave)}
            >
              Save Patient
            </Button>
          </Box>
        </form>
      </Box>
      <ConfirmActionDialog
        open={openCancelMessage}
        onClose={toggleCancelMesssage}
        onConfirm={onConfirmCancel}
        confirmationTitle="Discard current changes?"
        confirmationMessage="You have unsaved changes. Are you sure you want to discard them?"
      />
    </>
  );
};

export default NewPatientForm;
