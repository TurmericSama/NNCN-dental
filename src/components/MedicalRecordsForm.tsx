import { useEffect, type FC } from "react";

import {
  Box,
  Typography,
  Grid,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Checkbox,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ConfirmActionDialog from "./ConfirmActionDialog";
import ControlledRadioGroup from "./RadioGroup";

const refinedBoolean = (value: any) => value === true || value === false;
const requiredMessage = "This field is required";

const resolveRefinedValidation = (enableCondition: boolean) => {
  if (enableCondition) {
    return false;
  }
  return true;
};

const ALLERGENS = z.enum([
  "Local Anesthetic (ex: Lidocaine)",
  "Penicillin, Antibiotics",
  "Sulfa Drugs",
  "Aspirin",
  "Latex",
]);

const BLOOD_TYPES = z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]);

const medicalRecordsSchema = z
  .object({
    goodHealth: z.boolean().refine((value) => typeof value === undefined, {
      error: "This field is required",
    }),
    inAnyTreatment: z.boolean().refine(refinedBoolean, requiredMessage),
    whatWasBeingTreated: z.string().optional(),
    seriousIllnessOrOperation: z.boolean(),
    whatWasTheSeriousIllness: z.string().optional(),
    hasEverBeenHospitalized: z.boolean(),
    hospitalizationReason: z.string().optional(),
    isTakingPrescriptionMedication: z.boolean(),
    prescriptionMedicationDetails: z.string().optional(),
    isUsingTobacco: z.boolean(),
    isUsingAlcoholOrDrugs: z.boolean(),
    isAllergicToMedications: z.array(z.union([ALLERGENS])).optional(),
    otherAllergies: z.string().optional(),
    bleedingTime: z.string("This field is required"),
    bloodType: BLOOD_TYPES.optional(),
    bloodPressure: z
      .number("This field is required")
      .min(0, "Blood pressure must be a positive number"),
    isPregnant: z.boolean().optional(),
  })
  .refine(
    (data) =>
      resolveRefinedValidation(
        data.inAnyTreatment
        //  data.whatWasBeingTreated
      ),
    { error: "If in treatment, please specify what was being treated." }
  )
  .refine(
    (data) =>
      resolveRefinedValidation(
        data.seriousIllnessOrOperation
        // data.whatWasTheSeriousIllness
      ),
    { error: "If you had a serious illness or operation, please specify." }
  )
  .refine(
    (data) =>
      resolveRefinedValidation(
        data.hasEverBeenHospitalized
        // data.hospitalizationReason
      ),
    { error: "If you have been hospitalized, please specify the reason." }
  );

const CHECK_BOX_GROUP_OPTIONS: Array<z.infer<typeof ALLERGENS>> = [
  "Local Anesthetic (ex: Lidocaine)",
  "Penicillin, Antibiotics",
  "Sulfa Drugs",
  "Aspirin",
  "Latex",
];

const BLOOD_TYPE_OPTIONS: Array<{
  label: z.infer<typeof BLOOD_TYPES>;
  value: z.infer<typeof BLOOD_TYPES>;
}> = BLOOD_TYPES.options.map((value) => ({ label: value, value }));

const MedicalRecordsForm: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(medicalRecordsSchema),
    defaultValues: {
      goodHealth: undefined,
      isAllergicToMedications: [],
    },
  });

  const [
    seriousIllnessOrOperation,
    inAnyTreatment,
    hasEverBeenHospitalized,
    isTakingPrescriptionMedication,
  ] = watch([
    "seriousIllnessOrOperation",
    "inAnyTreatment",
    "hasEverBeenHospitalized",
    "isTakingPrescriptionMedication",
  ]);

  useEffect(() => {
    if (!seriousIllnessOrOperation) {
      setValue("whatWasTheSeriousIllness", "");
    }
    if (!inAnyTreatment) {
      setValue("whatWasBeingTreated", "");
    }
    if (!hasEverBeenHospitalized) {
      setValue("hospitalizationReason", "");
    }
    if (!isTakingPrescriptionMedication) {
      setValue("prescriptionMedicationDetails", "");
    }
  }, [
    watch,
    seriousIllnessOrOperation,
    inAnyTreatment,
    hasEverBeenHospitalized,
    isTakingPrescriptionMedication,
  ]);

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 3, lg: 3, xl: 3 },
      }}
    >
      <Typography
        variant="h4"
        fontSize={{
          xs: "1.5rem",
          sm: "2rem",
          md: "2.5rem",
        }}
        fontWeight="bold"
        color="primary.main"
      >
        Medical Records Form
      </Typography>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 12, lg: 12 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <ControlledRadioGroup
                name="goodHealth"
                radioLabel="Are you in good health?"
                control={control}
                options={[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ]}
                errors={errors}
              />
              <ControlledRadioGroup
                name="inAnyTreatment"
                radioLabel="Are you currently in any treatment?"
                control={control}
                options={[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ]}
                errors={errors}
              />
              {inAnyTreatment && (
                <FormControl sx={{ mt: 1 }}>
                  <Controller
                    name="whatWasBeingTreated"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="What was being treated?"
                        variant="outlined"
                        fullWidth
                        error={!!errors.whatWasBeingTreated}
                        helperText={
                          errors.whatWasBeingTreated
                            ? errors.whatWasBeingTreated.message
                            : ""
                        }
                      />
                    )}
                  />
                </FormControl>
              )}
              <ControlledRadioGroup
                name="seriousIllnessOrOperation"
                radioLabel="Have you ever had serious illness or surgical operation?"
                control={control}
                options={[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ]}
                errors={errors}
              />
              {seriousIllnessOrOperation && (
                <FormControl sx={{ my: 1 }}>
                  <Controller
                    name="whatWasTheSeriousIllness"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="What was the serious illness?"
                        variant="outlined"
                        fullWidth
                        error={!!errors.seriousIllnessOrOperation}
                        helperText={
                          errors.seriousIllnessOrOperation
                            ? errors.seriousIllnessOrOperation.message
                            : ""
                        }
                      />
                    )}
                  />
                </FormControl>
              )}

              <ControlledRadioGroup
                name="hasEverBeenHospitalized"
                radioLabel="Have you ever been hospitalized?"
                control={control}
                options={[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ]}
                errors={errors}
              />
              {hasEverBeenHospitalized && (
                <FormControl sx={{ my: 1 }}>
                  <Controller
                    name="hospitalizationReason"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Please provide details about your hospitalization"
                        variant="outlined"
                        fullWidth
                        error={!!errors.hospitalizationReason}
                        helperText={
                          errors.hospitalizationReason
                            ? errors.hospitalizationReason.message
                            : ""
                        }
                      />
                    )}
                  />
                </FormControl>
              )}

              <ControlledRadioGroup
                name="isTakingPrescriptionMedication"
                control={control}
                radioLabel="Are you currently taking any prescription medication?"
                options={[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ]}
                errors={errors}
              />
              {isTakingPrescriptionMedication && (
                <FormControl sx={{ my: 1 }}>
                  <Controller
                    name="prescriptionMedicationDetails"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Please provide details about your prescription medication"
                        variant="outlined"
                        fullWidth
                        error={!!errors.prescriptionMedicationDetails}
                        helperText={
                          errors.prescriptionMedicationDetails
                            ? errors.prescriptionMedicationDetails.message
                            : ""
                        }
                      />
                    )}
                  />
                </FormControl>
              )}

              <ControlledRadioGroup
                name="isUsingTobacco"
                control={control}
                radioLabel="Do you use tobacco products?"
                options={[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ]}
                errors={errors}
              />

              <ControlledRadioGroup
                name="isUsingAlcoholOrDrugs"
                control={control}
                radioLabel="Do you use alcohol, cocaine, or other dangerous drugs?"
                options={[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ]}
                errors={errors}
              />
              <Controller
                name="isAllergicToMedications"
                control={control}
                render={({ field }) => {
                  // there isn't a quick way to just destructure a field value into this component
                  // we need to tinker with the field object
                  // value will represent an array of CHECK_BOX_GROUP_OPTIONS, and or a string provided by the user
                  const { value = [], onChange } = field;

                  return (
                    <FormControl>
                      <FormLabel component="legend">
                        Are you allergic to any of the following?
                      </FormLabel>
                      <FormGroup>
                        {CHECK_BOX_GROUP_OPTIONS.map((option) => (
                          <FormControlLabel
                            key={option}
                            control={
                              <Checkbox
                                checked={value.includes(option)}
                                onChange={(e) => {
                                  const newValue = e.target.checked
                                    ? [...value, option]
                                    : value.filter((v) => v !== option);
                                  onChange(newValue);
                                }}
                                name={option}
                              />
                            }
                            label={option}
                          />
                        ))}
                      </FormGroup>
                    </FormControl>
                  );
                }}
              />
              <Controller
                name="otherAllergies"
                control={control}
                render={({ field }) => (
                  <FormControl sx={{ my: 1 }}>
                    <TextField
                      {...field}
                      value={field.value || ""}
                      label="Other allergies"
                      variant="outlined"
                      fullWidth
                      error={!!errors.otherAllergies}
                      helperText={
                        errors.otherAllergies
                          ? errors.otherAllergies.message
                          : ""
                      }
                    />
                  </FormControl>
                )}
              />
              <Controller
                name="bleedingTime"
                control={control}
                render={({ field }) => (
                  <FormControl sx={{ my: 1 }}>
                    <TextField
                      {...field}
                      label="Bleeding Time"
                      variant="outlined"
                      fullWidth
                      error={!!errors.bleedingTime}
                      helperText={
                        errors.bleedingTime ? errors.bleedingTime.message : ""
                      }
                    />
                  </FormControl>
                )}
              />
              <Controller
                name="bloodType"
                control={control}
                render={({ field }) => (
                  <FormControl sx={{ width: 100, my: 1 }}>
                    <InputLabel id="blood-type-label">Blood Type</InputLabel>
                    <Select
                      {...field}
                      value={field.value || undefined}
                      labelId="blood-type-label"
                      id="blood-type-select"
                      label="Blood Type"
                    >
                      {BLOOD_TYPE_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                      <MenuItem
                        sx={{ fontStyle: "italic" }}
                        defaultChecked
                        defaultValue={undefined}
                        value={undefined}
                      >
                        NONE
                      </MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              <Typography gutterBottom mt={2} fontWeight="bold">
                Section for women only
              </Typography>
              <Controller
                name="isPregnant"
                control={control}
                render={({ field }) => (
                  <FormControl sx={{}}>
                    <FormLabel id="is-pregnant">Are you pregnant?</FormLabel>
                    <RadioGroup aria-labelledby="is-pregnant" {...field} row>
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Box>
          </Grid>
        </Grid>
        <Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Box>
      </form>
      <ConfirmActionDialog
        confirmationTitle="Confirm Submission"
        onClose={() => {}}
        open={false}
        onConfirm={() => {}}
      >
        <Box>
          <Typography>
            Here are the details you provided. Please confirm if they are
            correct before submitting.
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </Box>
      </ConfirmActionDialog>
    </Box>
  );
};

export default MedicalRecordsForm;
