const connection = require('../config/db');

const Item = {
    getAll: (userId, callback) => {
        connection.query('SELECT * FROM items WHERE userId = ?', [userId], callback);
    },

    create: (item, userId, callback) => {
        connection.query('INSERT INTO items (name, quantity, userId) VALUES (?, ?, ?)', [item.name, item.quantity, userId], callback);
    },

    update: (id, item, userId, callback) => {
        connection.query('UPDATE items SET name = ?, quantity = ?, completed = ? WHERE id = ? AND userId = ?', [item.name, item.quantity, item.completed, id, userId], callback);
    },

    delete: (id, userId, callback) => {
        connection.query('DELETE FROM items WHERE id = ? AND userId = ?', [id, userId], callback);
    }
};

module.exports = Item;
