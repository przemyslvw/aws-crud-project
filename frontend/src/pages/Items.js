import React, { useState } from "react";
import ItemForm from "../components/ItemForm";

function Items() {
    const [items, setItems] = useState([]);

    const handleAddItem = (newItem) => {
        setItems([...items, newItem]);
    };

    return (
        <div>
            <h1>Items List</h1>
            <ItemForm onAdd={handleAddItem} />

            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <strong>{item.name}:</strong> {item.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Items;
