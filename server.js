const mysql = require('mysql2');
const { response } = require('express');
const express = require('express');
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

// // **GET a SINGLE candidate** //
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(row);
// });

// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });

// **DELETE candidate** //
db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});

app.use((request, response) => {
    response.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});