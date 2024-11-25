const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize SQLite database
const db = new sqlite3.Database("./agents.db", (err) => {
    if (err) {
        console.error("Error opening database", err.message);
        process.exit(1); // Exit the application on failure
    } else {
        console.log("Connected to SQLite database.");
        db.run(
            `CREATE TABLE IF NOT EXISTS agents (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT NOT NULL
            )`,
            (err) => {
                if (err) {
                    console.error("Error creating table:", err.message);
                    process.exit(1);
                }
            }
        );
    }
});

// API Routes
app.get("/agents", (req, res) => {
    db.all("SELECT * FROM agents", [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.post("/agents", (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ error: "Name and description are required" });
    }
    const query = "INSERT INTO agents (name, description) VALUES (?, ?)";
    db.run(query, [name, description], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

app.put("/agents/:id", (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ error: "Name and description are required" });
    }
    const query = "UPDATE agents SET name = ?, description = ? WHERE id = ?";
    db.run(query, [name, description, req.params.id], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ updated: this.changes });
    });
});

app.delete("/agents/:id", (req, res) => {
    const query = "DELETE FROM agents WHERE id = ?";
    db.run(query, [req.params.id], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ deleted: this.changes });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
