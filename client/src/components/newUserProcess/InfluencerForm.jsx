import {Box, Button, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {useAuth} from '../../contexts/authContext';

const InfluencerForm = ({formSubmittedSuccessfully, setFormSubmittedSuccessfully}) => {

    const {currentUser} = useAuth();
    const userId = currentUser.uid
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Do a request to the database to create new influencer.
        try {
            const email = localStorage.getItem("email");
            const response = await fetch('api/createNewInfluencer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Send the email as JSON in the request body
                body: JSON.stringify({ userId, firstName, lastName, userName, email }),
            });

            // Parse the JSON response from the server
            const data = await response.json();
            if (data.message === "New influencer added") {
                setFormSubmittedSuccessfully(true)
                localStorage.setItem("userType",  "influencer")
                localStorage.setItem("userName", userName);

            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error)
        }
    };

    return (
        <Box component="form" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} onSubmit={handleSubmit}>
            {formSubmittedSuccessfully ? (
                <Typography variant="h6" fontWeight="fontWeightLight">Form Submitted</Typography>
            ) : (
                    <>
                        <TextField
                            required
                            label="First Name"
                            variant="outlined"
                            fullWidth margin="normal"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            required
                            label="Last Name"
                            variant="outlined"
                            fullWidth margin="normal"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <TextField
                            required
                            label="Username"
                            variant="outlined"
                            fullWidth margin="normal"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <Button type="submit" variant="outlined" sx={{ mt: 2 }}>
                            Submit
                        </Button>
                    </>
                    )}
        </Box>
    );
}

export default InfluencerForm