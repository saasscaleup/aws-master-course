const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connection = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({origin: '*'}));
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);


// Health Check Route
app.get('/health', (req, res) => {
    res.status(200).send({ status: 'OK', message: 'Server is healthy!' });
});

// Database connection Check Route
app.get('/database-health', (req, res) => {
    connection.query(
        "SELECT COUNT(*) as total_users FROM users",
        (error, results) => {
        if (error) {
            console.log("Database health failed:", error);
            return res.status(500).send({  status: 'FAILED', message: 'Database health failed!'});
        }

        console.log("Database is healthy!",results);
        res.status(200).send({status: 'OK', message: 'Database is healthy!',result: results});
        }
    );
 
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
