/**
 * @module routes/general
 * @description Express router configuration for general calculator endpoints (health, history, logger level)
 * @requires express
 * @requires ../controllers/general
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/general');

/**
 * @route GET /calculator/health
 * @description Health check endpoint
 */
router.get('/calculator/health', controller.health);

/**
 * @route GET /calculator/history
 * @description Get calculation history
 * @query {string} [flavor] - Filter by 'STACK' or 'INDEPENDENT'
 */
router.get('/calculator/history', controller.fetchHistory);

/**
 * @route DELETE /calculator/history
 * @description Clear calculation history
 */
router.delete('/calculator/history', controller.clearHistory);

/**
 * @route GET /logs/level
 * @description Retrieve the current log level of a logger
 * @query {string} logger-name - The name of the logger (e.g. 'stack', 'independent')
 */
router.get('/logs/level', controller.getLogLevel);

/**
 * @route PUT /logs/level
 * @description Update the log level of a logger
 * @query {string} logger-name - The name of the logger (e.g. 'stack', 'independent')
 * @body {string} level - The new log level (e.g. 'INFO', 'DEBUG')
 */
router.put('/logs/level', controller.setLogLevel);

module.exports = router;