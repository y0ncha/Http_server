/**
 * @module server
 * @description Express server setup for calculator application
 */


/****** IMPORTS ******/
const express = require('express');
const logReq = require('./middleware/requests'); // Middleware to log requests


/****** CONFIG ******/
const PORT = 8496;
const app = express();


/****** ROUTS ******/
/**
 * @constant {Router | {}} stackRoutes - Routes for stack-based calculator operations
 * @description This module handles operations that involve a stack-based approach to calculations.
 * @type {Router | {}}
 * @requires ./routes/stack
 * @see ./routes/stack
 */
const stackRoutes = require('./routes/stack');
app.use('/calculator', stackRoutes);

/**
 * @constant {Router | {}} independentRoutes - Routes for independent.log calculator operations
 * @description This module handles operations that do not depend on a stack, such as basic arithmetic.
 * @type {Router | {}}
 * @requires ./routes/independent.log
 * @see ./routes/independent.log
 */
const independentRoutes = require('./routes/independent');
app.use('/calculator', independentRoutes);

/**
 * @constant {Router | {}} historyRoutes - Routes for calculator history operations
 * @description This module manages the history of calculations performed by the calculator.
 * @type {Router | {}}
 * @requires ./routes/history
 * @see ./routes/history
 */
const historyRoutes = require('./routes/history');
app.use('/calculator', historyRoutes);


/****** MIDDLEWARE ******/
app.use(express.json());
app.use(logReq); // Middleware to log requests


/****** START SERVER ******/

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Health check endpoint to verify server status
app.get('/calculator/health', (req, res) => {
    res.status(200).send('OK');
});
