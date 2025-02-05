import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";

function ItemForm({ onAdd, initialData = null, buttonText = "Add Item" }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setDescription(initialData.description);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !description.trim()) return;

        const newItem = initialData
            ? { ...initialData, name, description }
            : { id: Date.now().toString(), name, description };

        onAdd(newItem);
        setName("");
        setDescription("");
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextField
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                {buttonText}
            </Button>
        </Box>
    );
}

export default ItemForm;
