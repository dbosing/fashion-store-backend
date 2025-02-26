const db = require("../db");

exports.getAllBookings = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM bookings");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM bookings WHERE id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: "Booking not found" });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createBooking = async (req, res) => {
    try {
        const { user_id, service_id, date } = req.body;
        const [result] = await db.query(
            "INSERT INTO bookings (user_id, service_id, date) VALUES (?, ?, ?)",
            [user_id, service_id, date]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const { user_id, service_id, date } = req.body;
        const [result] = await db.query(
            "UPDATE bookings SET user_id = ?, service_id = ?, date = ? WHERE id = ?",
            [user_id, service_id, date, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: "Booking not found" });
        res.json({ message: "Booking updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const [result] = await db.query("DELETE FROM bookings WHERE id = ?", [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Booking not found" });
        res.json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
