// src/app.js
const express = require('express');
const app = express();
const schoolRoutes = require('./src/routes/schoolRoutes');

app.use(express.json());
app.use('/api', schoolRoutes);

module.exports = app;



