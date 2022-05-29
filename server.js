const mysql = require('mysql2');
const { response } = require('express');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware //
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost', // use 127.0.0.1
        user: 'root',
        password: 'AtehAthena0430!',
        database: 'election',
    },
    console.log('Connected to the election database.')
);

app.use((request, response) => {
    response.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});