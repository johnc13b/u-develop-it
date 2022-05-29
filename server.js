const mysql = require('mysql2');
const { response } = require('express');
const express = require('express');
const inputCheck = require('./utils/inputCheck');
const app = express();
const PORT = process.env.PORT || 3001;

// **Middleware** //
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost', // use 127.0.0.1 //
        user: 'root',
        password: 'AtehAthena0430!', // remember to delete //
        database: 'election',
    },
    console.log('Connected to the election database.')
);

// **GET SINGLE candidate** //
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// **GET ALL candidates** //
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// **DELETE candidate** //
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// **CREATE candidate** //
app.post('/api/candidate', ({ body }, res) => {
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
    VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

app.use((req, res) => {
    response.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});