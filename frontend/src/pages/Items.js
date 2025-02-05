import React, { useEffect, useState } from "react";
import { fetchItems, addItem, deleteItem, updateItem } from "../api/api";
import ItemForm from "../components/ItemForm";
import { Box, List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

function Items() {
    const [items, setItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [open, setOpen] = useState(false); // Stan kontrolujący otwieranie popupu

    useEffect(() => {
        const loadItems = async () => {
            const data = await fetchItems();
            setItems(data);
        };
        loadItems();
    }, []);

    const handleAddItem = async (newItem) => {
        const item = {
            id: Date.now().toString(),
            startTime: newItem.startTime || "",
            endTime: newItem.endTime || "",
            startMileage: newItem.startMileage || 0,
            endMileage: newItem.endMileage || 0,
            driverName: newItem.driverName || "Unknown Driver",
            licensePlate: newItem.licensePlate || "Unknown Plate",
        };
    
        console.log("Sending data to API:", item);
        await addItem(item);
        setItems([...items, item]);    
        handleClose(); // Zamykamy popup po dodaniu wpisu
    };

    const handleDeleteItem = async (id) => {
        await deleteItem(id);
        setItems(items.filter((item) => item.id !== id));
    };

    const handleEditItem = (item) => {
        setEditingItem(item);
        setOpen(true); // Otwieramy popup do edycji
    };

    const handleUpdateItem = async (updatedItem) => {
        await updateItem(updatedItem.id, updatedItem);
        setItems(
            items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
        handleClose(); // Zamykamy popup po edycji
    };

    const handleOpen = () => {
        setEditingItem(null); // Nowy wpis, więc kasujemy edycję
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingItem(null);
    };

    return (
        <Box sx={{ maxWidth: "600px", margin: "auto", padding: 2 }}>
            <h1>Work Logs</h1>

            {/* Przycisk otwierający popup */}
            <Button variant="contained" color="primary" onClick={handleOpen} sx={{ marginBottom: 2 }}>
                Dodaj Nowy Rejestr
            </Button>

            {/* Popup z formularzem */}
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>{editingItem ? "Edytuj Rejestr" : "Dodaj Nowy Rejestr"}</DialogTitle>
                <DialogContent>
                    <ItemForm onAdd={editingItem ? handleUpdateItem : handleAddItem} initialData={editingItem} buttonText={editingItem ? "Zapisz zmiany" : "Dodaj"} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Anuluj
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Lista wpisów */}
            <List>
                {items.map((item) => (
                    <ListItem key={item.id} sx={{ display: "flex", flexDirection: "column", alignItems: "start", gap: 1 }}>
                        <ListItemText primary={`Driver: ${item.driverName}`} secondary={`License Plate: ${item.licensePlate}`} />
                        <ListItemText primary={`Start Time: ${item.startTime}`} secondary={`End Time: ${item.endTime}`} />
                        <ListItemText primary={`Start Mileage: ${item.startMileage} km`} secondary={`End Mileage: ${item.endMileage} km`} />
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Button variant="outlined" color="primary" size="small" onClick={() => handleEditItem(item)}>
                                Edit
                            </Button>
                            <Button variant="outlined" color="secondary" size="small" onClick={() => handleDeleteItem(item.id)}>
                                Delete
                            </Button>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default Items;
