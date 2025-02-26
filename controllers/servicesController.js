const db = require("../db");

exports.getAllServices = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM services");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM services WHERE id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: "Service not found" });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createService = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const [result] = await db.query(
            "INSERT INTO services (name, description, price) VALUES (?, ?, ?)",
            [name, description, price]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateService = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const [result] = await db.query(
            "UPDATE services SET name = ?, description = ?, price = ? WHERE id = ?",
            [name, description, price, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: "Service not found" });
        res.json({ message: "Service updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const [result] = await db.query("DELETE FROM services WHERE id = ?", [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Service not found" });
        res.json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
