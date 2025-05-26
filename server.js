/**
 * @module server
 * @description Express server setup for calculator application
 */

const express = require('express');
const app = express();

/** @constant {number} PORT - Server port number */
const PORT = 8496;

// Routes
const stackRoutes = require('./routes/stack');
const independentRoutes = require('./routes/independent');
const historyRoutes = require('./routes/history');

// Middleware for parsing JSON bodies
app.use(express.json());

// Mounting routes for calculator operations
app.use('/calculator', stackRoutes);
app.use('/calculator', independentRoutes);
app.use('/calculator', historyRoutes);

/**
 * @route GET /calculator/health
 * @description Health check endpoint
 */
app.get('/calculator/health', (req, res) => {
    res.status(200).send('OK');
});

/**
 * Start the server
 * @listens {number} PORT
 */
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
