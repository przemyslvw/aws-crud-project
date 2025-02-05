require("dotenv").config();
const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || "Items";

// Tworzenie nowego elementu
app.post("/items", async (req, res) => {
    const { id, name, description } = req.body;
    if (!id || !name || !description) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const params = {
        TableName: TABLE_NAME,
        Item: { id, name, description },
    };

    try {
        await dynamoDB.put(params).promise();
        res.status(201).json({ message: "Item added", item: params.Item });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Pobieranie wszystkich elementów
app.get("/items", async (req, res) => {
    const params = { TableName: TABLE_NAME };
    try {
        const data = await dynamoDB.scan(params).promise();
        res.json(data.Items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Usuwanie elementu
app.delete("/items/:id", async (req, res) => {
    const { id } = req.params;
    const params = {
        TableName: TABLE_NAME,
        Key: { id },
    };

    try {
        await dynamoDB.delete(params).promise();
        res.json({ message: "Item deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Konfiguracja Serverless Framework
module.exports.handler = serverless(app);
