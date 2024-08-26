// src/controllers/schoolController.js
const schoolModel = require('../models/schoolModel');

const addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;
    if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: 'Invalid input' });
    }
    schoolModel.addSchool(name, address, latitude, longitude, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(201).json({ message: 'School added successfully', id: results.insertId });
    });
};

const listSchools = (req, res) => {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }
    schoolModel.listSchools(latitude, longitude, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(200).json(results);
    });
};

module.exports = { addSchool, listSchools };

