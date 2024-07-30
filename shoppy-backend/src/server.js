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


// Recursive function to calculate Fibonacci number
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Health Check Route
app.get('/', (req, res) => {
    res.status(200).send('Hello from Shoppy-Backend!');
});

// Health Check Route
app.get('/health', (req, res) => {
    res.status(200).send({ status: 'OK', message: 'Server is healthy!' });
});

// Database connection Check Route
app.get('/api/database-health', (req, res) => {
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

// CPU-intensive algorithm 
app.get('/api/cpu-load/:n', (req, res) => {

    const n = parseInt(req.params.n, 10); // Parse the parameter as an integer

    if (isNaN(n) || n < 0) {
        return res.status(400).send('Invalid input. Please provide a non-negative integer.');
    }

    const result = fibonacci(n);
    console.log(`Fibonacci number at position ${n} is ${result}`);
    res.send(`Fibonacci number at position ${n} is ${result}`);
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
