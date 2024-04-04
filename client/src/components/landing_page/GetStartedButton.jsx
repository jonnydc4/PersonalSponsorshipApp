import {Button, Typography} from "@mui/material";

const handleGetStarted = () => {

}

export default function GetStartedButton() {
    return (
        <Button variant="contained" onClick={handleGetStarted}>
            <Typography fontWeight="fontWeightRegular">
                Get Started
            </Typography>
        </Button>
    )
}