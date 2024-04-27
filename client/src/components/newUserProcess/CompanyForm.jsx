import {Box, Button, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {useAuth} from '../../contexts/authContext';

const CompanyForm = ({formSubmittedSuccessfully, setFormSubmittedSuccessfully}) => {

    const {currentUser} = useAuth();
    const userId = currentUser.uid
    const [companyName, setCompanyName] = useState("");
    const [address, setAddress] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Do a request to the database to create new company.
        const response = await fetch('api/createNewCompany', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Send the email as JSON in the request body
            body: JSON.stringify({userId, companyName, address}),
        });

        try {
            // Parse the JSON response from the server
            const data = await response.json();
            if (data.message === "New company added") {
                setFormSubmittedSuccessfully(true)
                localStorage.setItem("userType",  "company")
                localStorage.setItem("userName", companyName);
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error)
        }
    };

    return (
        <Box component="form" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
             onSubmit={handleSubmit}>
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
                        label="Address"
                        variant="outlined"
                        fullWidth margin="normal"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Button type="submit" variant="outlined" sx={{mt: 2}}>
                        Submit
                    </Button>
                </>
            )}
        </Box>
    );
}

export default CompanyForm