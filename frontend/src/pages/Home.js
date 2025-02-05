import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
    return (
        <Container sx={{ textAlign: "center", marginTop: 5 }}>
            <Typography variant="h3" gutterBottom>
                Rejestr Pracy Kierowców
            </Typography>
            <Typography variant="h6" color="textSecondary" paragraph>
                Aplikacja do ewidencji czasu pracy i przebiegów pojazdów. 
                Zarejestruj swoją trasę, monitoruj czas pracy i przebieg auta w łatwy sposób!
            </Typography>
            <Box sx={{ marginTop: 4 }}>
                <Button variant="contained" color="primary" component={Link} to="/items">
                    Przejdź do Rejestru
                </Button>
            </Box>
        </Container>
    );
}

export default Home;
