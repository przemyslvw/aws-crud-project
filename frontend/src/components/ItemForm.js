import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";

function ItemForm({ onAdd, initialData = null, buttonText = "Zarejestruj Pracę" }) {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [startMileage, setStartMileage] = useState("");
    const [endMileage, setEndMileage] = useState("");
    const [licensePlate, setLicensePlate] = useState("");
    const [driverName, setDriverName] = useState("");

    useEffect(() => {
        if (initialData) {
            setStartTime(initialData.startTime);
            setEndTime(initialData.endTime);
            setStartMileage(initialData.startMileage);
            setEndMileage(initialData.endMileage);
            setLicensePlate(initialData.licensePlate);
            setDriverName(initialData.driverName);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Walidacja podstawowych danych
        if (!startTime || !endTime || !startMileage || !endMileage || !licensePlate || !driverName) {
            alert("Proszę wypełnić wszystkie pola!");
            return;
        }

        if (parseFloat(endMileage) < parseFloat(startMileage)) {
            alert("Końcowy przebieg musi być większy niż początkowy!");
            return;
        }

        const newItem = {
            id: initialData ? initialData.id : Date.now().toString(),
            startTime,
            endTime,
            startMileage: parseFloat(startMileage),
            endMileage: parseFloat(endMileage),
            licensePlate,
            driverName,
        };

        onAdd(newItem);

        // Resetowanie formularza po dodaniu elementu
        setStartTime("");
        setEndTime("");
        setStartMileage("");
        setEndMileage("");
        setLicensePlate("");
        setDriverName("");
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
                label="Imię Kierowcy"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                required
            />
            <TextField
                label="Numer Rejestracyjny"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                required
            />
            <TextField
                label="Czas Rozpoczęcia"
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
            />
            <TextField
                label="Czas Zakończenia"
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
            />
            <TextField
                label="Początkowy Przebieg (km)"
                type="number"
                value={startMileage}
                onChange={(e) => setStartMileage(e.target.value)}
                required
            />
            <TextField
                label="Końcowy Przebieg (km)"
                type="number"
                value={endMileage}
                onChange={(e) => setEndMileage(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                {buttonText}
            </Button>
        </Box>
    );
}

export default ItemForm;
