const { response } = require('express');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (request, response) => {
    response.json({
        message: 'Hello World'
    });
});

app.use((request, response) => {
    response.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});