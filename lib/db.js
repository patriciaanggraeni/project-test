// File: server.js
const express = require('express');
const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = 3000;

const pool = new Pool({
  user: process.env.PGSQL_USER,
  host: process.env.PGSQL_HOST,
  database: process.env.PGSQL_DATABASE,
  password: process.env.PGSQL_PASSWORD,
  port: process.env.PGSQL_PORT,
});

app.get('/api/sensor-data', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM sensor_data');
    const sensorData = result.rows;
    client.release();
    res.json(sensorData);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
