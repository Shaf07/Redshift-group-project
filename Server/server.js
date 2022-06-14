const express = require('express');
const cors = require('cors');
const routes = require('./controllers');

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5015;

//middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(routes);

app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
