const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const { verifyToken } = require('../middlewares/authMiddleware');

// Get all items
router.get('/', verifyToken, (req, res) => {
    Item.getAll(req.userId, (error, results) => {
        if (error){
            console.log(error);
            return res.status(500).send(error);
        } 
        res.status(200).send(results);
    });
});

// Add a new item
router.post('/', verifyToken, (req, res) => {
    Item.create(req.body, req.userId, (error, results) => {
        if (error){
            console.log(error);
            return res.status(500).send(error);
        } 
        res.status(201).send({ id: results.insertId, ...req.body });
    });
});

// Update an item
router.put('/:id', verifyToken, (req, res) => {
    Item.update(req.params.id, req.body, req.userId, (error, results) => {
        if (error){
            console.log(error);
            return res.status(500).send(error);
        } 
        if (results.affectedRows === 0) return res.status(404).send('Item not found.');
        res.status(200).send({ id: req.params.id, ...req.body });
    });
});

// Delete an item
router.delete('/:id', verifyToken, (req, res) => {
    Item.delete(req.params.id, req.userId, (error, results) => {
        if (error){
            console.log(error);
            return res.status(500).send(error);
        } 
        if (results.affectedRows === 0) return res.status(404).send('Item not found.');
        res.status(200).send({ message: 'Item deleted successfully.' });
    });
});

module.exports = router;
