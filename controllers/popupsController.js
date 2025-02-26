const db = require("../db");

exports.getAllPopups = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM popups");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPopupById = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM popups WHERE id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: "Pop-up shop not found" });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createPopup = async (req, res) => {
    try {
        const { name, location, date } = req.body;
        const [result] = await db.query(
            "INSERT INTO popups (name, location, date) VALUES (?, ?, ?)",
            [name, location, date]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePopup = async (req, res) => {
    try {
        const { name, location, date } = req.body;
        const [result] = await db.query(
            "UPDATE popups SET name = ?, location = ?, date = ? WHERE id = ?",
            [name, location, date, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: "Pop-up shop not found" });
        res.json({ message: "Pop-up shop updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePopup = async (req, res) => {
    try {
        const [result] = await db.query("DELETE FROM popups WHERE id = ?", [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Pop-up shop not found" });
        res.json({ message: "Pop-up shop deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
