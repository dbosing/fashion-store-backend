const db = require("../db");

exports.getAllOrders = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM orders");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM orders WHERE id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: "Order not found" });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const { user_id, product_id, quantity, total_price } = req.body;
        const [result] = await db.query(
            "INSERT INTO orders (user_id, product_id, quantity, total_price) VALUES (?, ?, ?, ?)",
            [user_id, product_id, quantity, total_price]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const { user_id, product_id, quantity, total_price } = req.body;
        const [result] = await db.query(
            "UPDATE orders SET user_id = ?, product_id = ?, quantity = ?, total_price = ? WHERE id = ?",
            [user_id, product_id, quantity, total_price, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: "Order not found" });
        res.json({ message: "Order updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const [result] = await db.query("DELETE FROM orders WHERE id = ?", [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Order not found" });
        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
