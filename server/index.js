require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const router = require('./routes');

const db = require('./db');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', router);

app.use(express.static(path.join(__dirname, '../client/public')));

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
