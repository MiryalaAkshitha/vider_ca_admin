import { Box, Grid, MenuItem, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import countries from "utils/countries";
import { FormBuilderInputTypes } from "../utils/renderFieldsComponent";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
  required?: boolean;
  inputs: any[];
  instructions?: string;
}

function FormBuilderFieldWithInputs(props: Props) {
  const {
    name,
    control,
    label = "",
    required = false,
    inputs,
    instructions,
  } = props;

  return (
    <>
      <Typography gutterBottom variant="body2">
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Grid container spacing={2}>
              {inputs.map((input, index) => {
                return (
                  <React.Fragment key={index}>
                    {getInput(input, field)}
                  </React.Fragment>
                );
              })}
            </Grid>
            {instructions && (
              <Box>
                <Typography variant="caption" color="rgba(0,0,0,0.7)">
                  <pre style={{ fontFamily: "inherit" }}>{instructions}</pre>
                </Typography>
              </Box>
            )}
            {error && (
              <Typography
                variant="caption"
                sx={{ pl: "2px", display: "block", pt: "4px" }}
                color="rgb(211, 47, 47)"
              >
                {(error as any)[Object.keys(error)[0]]?.message}
              </Typography>
            )}
          </>
        )}
      />
    </>
  );
}

const getInput = (input: any, field: any) => {
  let isTitle = input.inputType === "TITLE" && !input.hide;
  let isCountry = input.inputType === "COUNTRY" && !input.hide;

  if (isTitle || isCountry) {
    return (
      <Grid item xs={6}>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          select
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  maxHeight: "300px",
                },
              },
            },
          }}
          value={
            field?.value && field.value[input?._id]
              ? field.value[input?._id]
              : ""
          }
          onChange={(e) => {
            let value = field.value || {};
            field.onChange({
              ...value,
              [input._id]: e.target.value,
            });
          }}
          placeholder={input.placeholder || ""}
        >
          {getOptions(input)?.map((option: any, index: number) => (
            <MenuItem key={index} value={option?.value}>
              {option?.label}
            </MenuItem>
          ))}
        </TextField>
        <Typography
          sx={{ display: "block", mt: "3px" }}
          variant="caption"
          color="rgba(0,0,0,0.6)"
        >
          {input.label}{" "}
          {input?.required && <span style={{ color: "red" }}>*</span>}
        </Typography>
      </Grid>
    );
  } else {
    if (!input.hide) {
      return (
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            value={
              field?.value && field.value[input?._id]
                ? field.value[input?._id]
                : ""
            }
            onChange={(e) => {
              let value = field.value || {};
              field.onChange({
                ...value,
                [input._id]: e.target.value,
              });
            }}
            placeholder={input.placeholder || ""}
          />
          <Typography
            sx={{ display: "block", mt: "3px" }}
            variant="caption"
            color="rgba(0,0,0,0.6)"
          >
            {input.label}{" "}
            {input?.required && <span style={{ color: "red" }}>*</span>}
          </Typography>
        </Grid>
      );
    } else {
      return null;
    }
  }
};

const getOptions = (input: any) => {
  if (input.inputType === FormBuilderInputTypes.TITLE) {
    return input.options;
  }

  if (input.inputType === FormBuilderInputTypes.COUNTRY) {
    return countries.map((item: any) => {
      return {
        label: item.label,
        value: item.code,
      };
    });
  }

  return input.options;
};

export default FormBuilderFieldWithInputs;
