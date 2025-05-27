/**
 * @module routes/history
 * @description Express router configuration for stack-related calculator endpoints
 * @requires express
 * @requires ../controllers/calculator
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/general');

/**
 * @route GET /calculator/health
 * @description Health check endpoint
 */
router.get('/health', controller.health);

/**
 * @route GET /calculator/history
 * @description Get calculation history
 * @query {string} [flavor] - Filter by 'STACK' or 'INDEPENDENT'
 */
router.get('/history', controller.fetchHistory);

/**
 * @route DELETE /calculator/history
 * @description Clear calculation history
 */
router.delete('/history', controller.clearHistory);

module.exports = router;