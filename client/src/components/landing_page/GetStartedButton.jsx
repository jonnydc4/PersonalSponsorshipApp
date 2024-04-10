import {Button, Typography} from "@mui/material";
import { useNavigate } from 'react-router-dom';

export default function GetStartedButton() {

    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/register")
    }

    return (
        <Button variant="contained" onClick={handleGetStarted}>
            <Typography fontWeight="fontWeightRegular">
                Get Started
            </Typography>
        </Button>
    )
}