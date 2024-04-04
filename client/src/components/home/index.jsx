import React from 'react'
import { useAuth } from '../../contexts/authContext'
import Typography from "@mui/material/Typography";

const Home = () => {
    const { currentUser } = useAuth()
    return (
        <Typography
            variant="h4"
            component="div"
            sx={{
                fontWeight: 'bold',
                pt: 14,
            }}
        >
            Hello {currentUser.displayName || currentUser.email}, you are now logged in.
        </Typography>
    )
}

export default Home