import {Box, Button, TextField, Typography} from "@mui/material";
import React, {useState} from "react";

const InfluencerForm = ({formSubmittedSuccessfully, setFormSubmittedSuccessfully}) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();

        // Do a request to the database to create new influencer.

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