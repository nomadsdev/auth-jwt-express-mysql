const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const router = require('./api/auth');

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
});