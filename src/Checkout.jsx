import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

import AddressForm from "./components/AddressForm";
import PaymentForm from "./components/PaymentForm";
import Review from "./components/Review";
import Info from "./components/Info";
import InfoMobile from "./components/InfoMobile";
import SitemarkIcon from "./components/SitemarkIcon";
import AppTheme from "./AppTheme";

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review />;
        default:
            throw new Error("Unknown step");
    }
}

export default function Checkout() {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <AppTheme>
            <CssBaseline />
            <Grid container>
                <Grid item xs={12} md={6}>
                    <SitemarkIcon />
                    <Info
                        totalPrice={activeStep >= 2 ? "$144.97" : "$134.98"}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <Typography variant="h5">
                            Thank you for your order!
                        </Typography>
                    ) : (
                        <>
                            {getStepContent(activeStep)}
                            <Box sx={{ mt: 2 }}>
                                {activeStep > 0 && (
                                    <Button onClick={handleBack}>Back</Button>
                                )}
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                >
                                    {activeStep === steps.length - 1
                                        ? "Place order"
                                        : "Next"}
                                </Button>
                            </Box>
                        </>
                    )}
                    <Card sx={{ mt: 2, display: { xs: "block", md: "none" } }}>
                        <CardContent>
                            <InfoMobile
                                totalPrice={
                                    activeStep >= 2 ? "$144.97" : "$134.98"
                                }
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </AppTheme>
    );
}
