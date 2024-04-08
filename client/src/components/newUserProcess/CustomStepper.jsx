import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Box,
    Container, Snackbar
} from '@mui/material';
import InfluencerForm from "./InfluencerForm";
import CompanyForm from "./CompanyForm";

const steps = ['Select Account Type', 'Fill Out Information', 'Start Connecting'];

export default function CustomStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [accountType, setAccountType] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleNext = () => {

        if (activeStep === 0) {
            if (accountType === '') {
                setSnackbarMessage("Must select a account type.")
                setSnackbarOpen(true)
            } else {
                setSnackbarOpen(false)
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        }
        if (activeStep === 1) {
            if (formSubmitted) {
                setSnackbarOpen(false)
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            } else {
                setSnackbarMessage("Must input and submit profile information.")
                setSnackbarOpen(true)
            }
        }
        if (activeStep === 2) {
            navigate("/dashboard")
        }
    };


    const handleBack = () => {
        if (activeStep === 1 && formSubmitted) {
            setSnackbarMessage("Cannot change account type after submitting form.")
            setSnackbarOpen(true)
        } else {
            setSnackbarOpen(false)
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };

    const handleReset = () => {
        setActiveStep(0);
        setAccountType('');
    };

    const StepTitle = ({step}) => {
        switch (step) {
            case 0:
                return (
                    <Box>
                        <Typography variant="h4" fontWeight="fontWeightBold" textAlign="center">Step 1</Typography>
                        <Typography variant="h6" fontWeight="fontWeightLight" textAlign="center">Select account type.</Typography>
                    </Box>
                )
            case 1:
                return (
                    <Box>
                        <Typography variant="h4" fontWeight="fontWeightBold" textAlign="center">Step 2</Typography>
                        <Typography variant="h6" fontWeight="fontWeightLight" textAlign="center">Fill out information.</Typography>
                    </Box>
                )
            case 2:
                return (
                    <Box>
                        <Typography variant="h4" fontWeight="fontWeightBold" textAlign="center">Step 3</Typography>
                        <Typography variant="h6" fontWeight="fontWeightLight" textAlign="center">Start connecting.</Typography>
                    </Box>
                )
            default:
                console.error("Step does not exist.")
                break
        }
    }

    const StepContent = ({step}) => {

        switch (step) {
            case 0:
                return (
                    <Box>
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="account-type"
                                name="account-type"
                                value={accountType}
                                onChange={(event) => setAccountType(event.target.value)}
                            >
                                <FormControlLabel value="Influencer" control={<Radio/>} label="Influencer"/>
                                <FormControlLabel value="Company" control={<Radio/>} label="Company"/>
                            </RadioGroup>
                        </FormControl>
                    </Box>
                );
            case 1:
                if (accountType === "Influencer") {
                    return (<InfluencerForm formSubmittedSuccessfully={formSubmitted} setFormSubmittedSuccessfully={setFormSubmitted}/>);
                } else {
                    return (<CompanyForm/>);
                }
            case 2:
                return (
                    <Typography textAlign="center">
                        Thank you for your submission. You can view your profile on your dashboard.
                    </Typography>
                );
            default:
                return 'Unknown step';
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{width: '100%', mt: 5}}>
                <StepTitle step={activeStep}/>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2}}>
                    {activeStep === steps.length ? (
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2}}>
                            <Typography>All steps completed - you&apos;re finished</Typography>
                            <Button onClick={handleReset} sx={{mt: 1}}>Reset</Button>
                        </Box>
                    ) : (
                        <Box sx={{mt: 2}}>
                            <StepContent step={activeStep}/>
                            <Snackbar
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                open={snackbarOpen}
                                autoHideDuration={6000}
                                onClose={handleCloseSnackbar}
                                message={snackbarMessage}
                            />
                            <Box sx={{display: 'flex', justifyContent: 'center', pt: 2}}>
                                <Button disabled={activeStep === 0} onClick={handleBack} sx={{mr: 1}}>
                                    Back
                                </Button>
                                <Button variant="contained" onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Container>
    );
}
