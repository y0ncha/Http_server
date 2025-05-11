/**
 * @module server
 * @description Express server setup for calculator application
 */

const express = require('express');
const routes = require('./routes/calculator');

/** @constant {number} PORT - Server port number */
const PORT = 8496;

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

/**
 * Mount calculator routes under /calculator path
 * @see module:routes/calculator
 */
app.use('/calculator', routes);

/**
 * Start the server
 * @listens {number} PORT
 */
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});