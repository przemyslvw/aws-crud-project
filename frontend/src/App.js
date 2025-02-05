import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, Container, Button } from "@mui/material";
import Home from "./pages/Home";
import Items from "./pages/Items";
import NotFound from "./pages/NotFound";
import theme from "./theme"; // Importujemy motyw Material-UI

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                {/* Górny pasek nawigacyjny */}
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            CRUD App
                        </Typography>
                        <Button color="inherit" component={Link} to="/">
                            Home
                        </Button>
                        <Button color="inherit" component={Link} to="/items">
                            Items
                        </Button>
                    </Toolbar>
                </AppBar>

                {/* Główna zawartość */}
                <Container sx={{ marginTop: 4 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/items" element={<Items />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Container>
            </Router>
        </ThemeProvider>
    );
}

export default App;
