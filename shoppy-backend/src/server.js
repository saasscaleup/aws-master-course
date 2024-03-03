const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
