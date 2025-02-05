import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { pl } from "date-fns/locale";
import Home from "./pages/Home";
import Items from "./pages/Items";
import NotFound from "./pages/NotFound";
import theme from "./theme";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
                <Router>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                Rejestr Pracy Kierowców 🚛
                            </Typography>
                            <Button color="inherit" component={Link} to="/">
                                Home
                            </Button>
                            <Button color="inherit" component={Link} to="/items">
                                Rejestr Pracy
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/items" element={<Items />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;
