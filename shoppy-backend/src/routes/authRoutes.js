const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const connection = require('../config/db');

// Register
router.post('/register', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    connection.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        const token = jwt.sign({ id: results.insertId }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token });
    });
});

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    connection.query('SELECT * FROM users WHERE email = ?', [email], (error, users) => {
        if (error){
            console.log(error); // Log the error to see what's going wrong
            return res.status(500).send(error);
        } 
        if (users.length === 0) return res.status(404).send('No user found.');

        const user = users[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        const token = jwt.sign({ id: user.id }, process.env.SECRET, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({ auth: true, token });
    });
});


module.exports = router;
