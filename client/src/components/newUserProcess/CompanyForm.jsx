import {Box, Button, TextField, Typography} from "@mui/material";
import React, {useState} from "react";

const CompanyForm = ({formSubmittedSuccessfully, setFormSubmittedSuccessfully}) => {

    const [companyName, setCompanyName] = useState("");
    const [address, setAddress] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();

        // Do a request to the database to create new company.


        setFormSubmittedSuccessfully(true)
    };

    return (
        <Box component="form" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} onSubmit={handleSubmit}>
            {formSubmittedSuccessfully ? (
                <Typography variant="h6" fontWeight="fontWeightLight">Form Submitted</Typography>
            ) : (
                <>
                    <TextField
                        required
                        label="Company Name"
                        variant="outlined"
                        fullWidth margin="normal"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <TextField
                        required
                        label="Address"
                        variant="outlined"
                        fullWidth margin="normal"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Button type="submit" variant="outlined" sx={{ mt: 2 }}>
                        Submit
                    </Button>
                </>
            )}
        </Box>
    );
}

export default CompanyForm