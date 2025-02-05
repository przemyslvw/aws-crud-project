const API_URL = "https://backend-crud-project-production.up.railway.app/items";

export const fetchItems = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

export const addItem = async (item) => {
    console.log("Sending data to API:", item); // Sprawdź dane
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
    });
};

export const deleteItem = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
};

export const updateItem = async (id, updatedItem) => {
    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
    });
};

