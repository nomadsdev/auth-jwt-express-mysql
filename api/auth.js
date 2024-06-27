const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connectMysql = require('../lib/mysql');
const createToken = require('../middleware/token');

router.post('/login', (req, res) => {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
        return res.status(400).json({ error: 'Please provide email or username and password' });
    }

    const authsql = `SELECT * FROM users WHERE email = ? OR username = ?`;

    connectMysql.query(authsql, [emailOrUsername, emailOrUsername], (err, results) => {
        if (err) {
        return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid email/username or password' });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
            return res.status(500).json({ error: 'Bcrypt error' });
        }

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email/username or password' });
        }

        const token = createToken(user);
        res.json({ token, message: 'success' });
        });
    });
});

router.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Please provide username, email, and password' });
    }

    const checkUserSql = `SELECT * FROM users WHERE email = ? OR username = ?`;

    connectMysql.query(checkUserSql, [email, username], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length > 0) {
            return res.status(409).json({ error: 'User with this email or username already exists' });
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ error: 'Bcrypt error' });
            }

            const insertsql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

            connectMysql.query(insertsql, [username, email, hashedPassword], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Database error' });
                }

                const user = { id: result.insertId, username, email };
                const token = createToken(user);
                res.status(201).json({ token });
            });
        });
    });
});

module.exports = router;