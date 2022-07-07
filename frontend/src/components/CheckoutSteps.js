import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

const steps = ["Shipping", "Payment", "Place Order"];

const CheckoutSteps = ({ step }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step
            key={label}
            sx={{
              "& .MuiStepLabel-root .Mui-completed": {
                color: "primary.dark", // circle color (COMPLETED)
              },
              "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel": {
                color: "grey.500", // Just text label (COMPLETED)
              },
              "& .MuiStepLabel-root .Mui-active": {
                color: "primary.main", // circle color (ACTIVE)
              },
              "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
                color: "common.white", // Just text label (ACTIVE)
              },
              // '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
              //   fill: 'white', // circle's number (ACTIVE)
              // },
              "& .MuiStepLabel-root .Mui-disabled": {
                color: "grey.500", // Just text label (ACTIVE)
              },
              "& .MuiStepLabel-root.Mui-disabled svg": {
                color: "grey.700", // circle color (DISABLED)
              },
            }}
          >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default CheckoutSteps;
