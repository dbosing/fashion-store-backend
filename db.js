const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function testDB() {
    try {
        const conn = await pool.getConnection();
        console.log("✅ Database connected successfully!");
        conn.release();
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
    }
}
testDB();

module.exports = pool;
