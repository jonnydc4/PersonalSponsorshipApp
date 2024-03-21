import {Container, Grid, Box, Typography} from '@mui/material';
import GetStartedButton from "./GetStartedButton";

export default function LandingPage() {



    return (
        <Container maxWidth="lg" xs={12}>
            <Grid container spacing={3}>
                {/* Hero Section */}
                <Grid item xs={12}>
                    <Box
                        sx={{
                            p: 6,
                            textAlign: 'center',
                        }}
                    >
                        <Typography fontWeight="fontWeightBold" variant="h2" gutterBottom>
                            Connect. Negotiate. Influence.
                        </Typography>
                        <Typography fontWeight="fontWeightLight" variant="h5">
                            Everything you need to manage your brand deals, all in one place.
                        </Typography>
                    </Box>
                </Grid>
                {/* Call to action button, e.g., to sign up or learn more */}
                <Grid item xs={12} textAlign="center">
                    <GetStartedButton/>
                    {/* More content here */}
                </Grid>
                {/* Additional content and layout adjustments as needed */}
            </Grid>
        </Container>
    );
}
