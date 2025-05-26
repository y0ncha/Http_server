/**
 * @module server
 * @description Express server setup for calculator application
 */

const express = require('express');
const app = express();

/** @constant {number} PORT - Server port number */
const PORT = 8496;

// Routes

/**
 * @constant {Router | {}} stackRoutes - Routes for stack-based calculator operations
 * @description This module handles operations that involve a stack-based approach to calculations.
 * @type {Router | {}}
 * @requires ./routes/stack
 * @see ./routes/stack
 */
const stackRoutes = require('./routes/stack');

/**
 * @constant {Router | {}} independentRoutes - Routes for independent.log calculator operations
 * @description This module handles operations that do not depend on a stack, such as basic arithmetic.
 * @type {Router | {}}
 * @requires ./routes/independent.log
 * @see ./routes/independent.log
 */
const independentRoutes = require('./routes/independent');

/**
 * @constant {Router | {}} historyRoutes - Routes for calculator history operations
 * @description This module manages the history of calculations performed by the calculator.
 * @type {Router | {}}
 * @requires ./routes/history
 * @see ./routes/history
 */
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
