const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const { verifyToken } = require('../middlewares/authMiddleware');

// Get all items
router.get('/', verifyToken, (req, res) => {
    Item.getAll(req.userId, (error, results) => {
        console.log('GET /', req.userId, results);
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
        console.log('POST /', req.userId, req.body);
        if (error){
            console.log(error);
            return res.status(500).send(error);
        } 
        const response = { id: results.insertId, ...req.body };
        console.log(response);
        res.status(201).send(response);
    });
});

// Update an item
router.put('/:id', verifyToken, (req, res) => {
    Item.update(req.params.id, req.body, req.userId, (error, results) => {
        console.log('PUT /' + req.params.id, req.userId, req.body);
        if (error){
            console.log(error);
            return res.status(500).send(error);
        } 
        if (results.affectedRows === 0) {
            console.log('Item not found.');
            return res.status(404).send('Item not found.');
        }
        const response = { id: req.params.id, ...req.body };
        console.log(response);
        res.status(200).send(response);
    });
});

// Delete an item
router.delete('/:id', verifyToken, (req, res) => {
    Item.delete(req.params.id, req.userId, (error, results) => {
        console.log('DELETE /' + req.params.id, req.userId);
        if (error){
            console.log(error);
            return res.status(500).send(error);
        } 
        if (results.affectedRows === 0) {
            console.log('Item not found.');
            return res.status(404).send('Item not found.');
        }
        console.log({ message: 'Item deleted successfully.' });
        res.status(200).send({ message: 'Item deleted successfully.' });
    });
});


module.exports = router;
