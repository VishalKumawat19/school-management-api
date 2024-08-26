// src/models/schoolModel.js
const db = require('../config/db');

const addSchool = (name, address, latitude, longitude, callback) => {
    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(query, [name, address, latitude, longitude], callback);
};

const listSchools = (userLat, userLong, callback) => {
    const query = `
        SELECT *, (
            6371 * ACOS(
                COS(RADIANS(?)) * COS(RADIANS(latitude)) *
                COS(RADIANS(longitude) - RADIANS(?)) +
                SIN(RADIANS(?)) * SIN(RADIANS(latitude))
            )
        ) AS distance
        FROM schools
        ORDER BY distance
    `;
    db.query(query, [userLat, userLong, userLat], callback);
};

module.exports = { addSchool, listSchools };

