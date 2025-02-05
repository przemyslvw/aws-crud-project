import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
    ThemeProvider,
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { pl } from "date-fns/locale";
import Home from "./pages/Home";
import Items from "./pages/Items";
import NotFound from "./pages/NotFound";
import theme from "./theme";

function App() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const drawerContent = (
        <List>
            <ListItem button={true} component={Link} to="/" onClick={toggleDrawer(false)}>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button={true} component={Link} to="/items" onClick={toggleDrawer(false)}>
                <ListItemText primary="Rejestr Pracy" />
            </ListItem>
        </List>
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
                <Router>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                                sx={{ display: { xs: "block", sm: "none" } }} // Pokazujemy tylko na mobilnych
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                Rejestr Pracy Kierowców 🚛
                            </Typography>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/"
                                sx={{ display: { xs: "none", sm: "block" } }} // Ukrywamy na mobilnych
                            >
                                Home
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/items"
                                sx={{ display: { xs: "none", sm: "block" } }} // Ukrywamy na mobilnych
                            >
                                Rejestr Pracy
                            </Button>
                        </Toolbar>
                    </AppBar>

                    {/* Drawer */}
                    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                        {drawerContent}
                    </Drawer>

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
