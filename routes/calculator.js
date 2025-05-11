/**
 * @module routes/calculator
 * @description Express router configuration for calculator endpoints
 * @requires express
 * @requires ../controllers/calculator
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/calculator');

/**
 * @route GET /calculator/health
 * @description Health check endpoint
 */
router.get('/health', controller.health);

/**
 * @route POST /calculator/independent/calculate
 * @description Perform calculation with provided arguments
 * @body {Object} request
 * @body {string} request.operation - Operation to perform
 * @body {number[]} request.arguments - Array of integers
 */
router.post('/independent/calculate', controller.independentCalculate);

/**
 * @route GET /calculator/stack/size
 * @description Get current stack size
 */
router.get('/stack/size', controller.getStackSize);

/**
 * @route PUT /calculator/stack/arguments
 * @description Push numbers onto the stack
 * @body {Object} request
 * @body {number[]} request.arguments - Array of integers to push
 */
router.put('/stack/arguments', controller.pushArgs);

/**
 * @route GET /calculator/stack/operate
 * @description Perform operation using numbers from stack
 * @query {string} operation - Operation to perform
 */
router.get('/stack/operate', controller.stackCalculate);

/**
 * @route DELETE /calculator/stack/arguments
 * @description Remove numbers from the stack
 * @query {number} count - Number of items to remove
 */
router.delete('/stack/arguments', controller.popArgs);

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