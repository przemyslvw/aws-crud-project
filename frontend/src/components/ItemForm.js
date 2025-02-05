import React, { useState } from "react";

function ItemForm({ onAdd }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !description.trim()) return;

        // Tworzymy nowy obiekt itemu
        const newItem = {
            id: Date.now().toString(),
            name,
            description,
        };

        // Wywołujemy funkcję przekazaną jako prop
        onAdd(newItem);

        // Resetujemy formularz
        setName("");
        setDescription("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <input 
                    type="text" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required
                />
            </div>
            <button type="submit">Add Item</button>
        </form>
    );
}

export default ItemForm;
