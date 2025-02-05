import React, { useEffect, useState } from "react";
import { fetchItems, addItem, deleteItem, updateItem } from "../api/api";
import ItemForm from "../components/ItemForm";
import { Box, List, ListItem, ListItemText, Button } from "@mui/material";

function Items() {
    const [items, setItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        const loadItems = async () => {
            const data = await fetchItems();
            setItems(data);
        };
        loadItems();
    }, []);

    const handleAddItem = async (newItem) => {
        await addItem(newItem);
        setItems([...items, newItem]);
    };

    const handleDeleteItem = async (id) => {
        await deleteItem(id);
        setItems(items.filter((item) => item.id !== id));
    };

    const handleEditItem = (item) => {
        setEditingItem(item);
    };

    const handleUpdateItem = async (updatedItem) => {
        await updateItem(updatedItem.id, updatedItem);
        setItems(
            items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
        setEditingItem(null);
    };

    return (
        <Box sx={{ maxWidth: "600px", margin: "auto", padding: 2 }}>
            <h1>Items List</h1>
            {editingItem ? (
                <ItemForm
                    onAdd={handleUpdateItem}
                    initialData={editingItem}
                    buttonText="Update Item"
                />
            ) : (
                <ItemForm onAdd={handleAddItem} />
            )}
            <List>
                {items.map((item) => (
                    <ListItem key={item.id} sx={{ display: "flex", justifyContent: "space-between" }}>
                        <ListItemText primary={item.name} secondary={item.description} />
                        <Box>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                onClick={() => handleEditItem(item)}
                                sx={{ marginRight: 1 }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                size="small"
                                onClick={() => handleDeleteItem(item.id)}
                            >
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
