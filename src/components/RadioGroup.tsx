import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormHelperText,
} from "@mui/material";
import type { FC } from "react";
import { Controller } from "react-hook-form";
import stringToBoolean from "@lib/stringToBoolean";

type RadioGroupOption = {
  label: string;
  value: string | number | boolean;
};

interface RadioGroupProps {
  control: any;
  options?: RadioGroupOption[];
  errors: Record<string, any>;
  radioLabel: string;
  name: string;
}

const ControlledRadioGroup: FC<RadioGroupProps> = ({
  control,
  options,
  errors,
  radioLabel,
  name,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.value === "true" || e.target.value === "false") {
            const returnValue = stringToBoolean(e.target.value);
            field.onChange(returnValue);
          } else {
            field.onChange(e.target.value);
          }
        };
        return (
          <FormControl>
            <FormLabel id="has-ever-been-hospitalized">{radioLabel}</FormLabel>
            <RadioGroup
              aria-labelledby="has-ever-been-hospitalized"
              {...field}
              value={field.value ?? ""}
              onChange={onChange}
              row
            >
              {options?.map((option) => (
                <FormControlLabel
                  key={`option-${option.label}-key`}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {errors.hasEverBeenHospitalized && (
              <FormHelperText error>
                {errors.hasEverBeenHospitalized.message}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};

export default ControlledRadioGroup;
