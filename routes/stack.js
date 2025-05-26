/**
 * @module routes/stack
 * @description Express router configuration for stack-related calculator endpoints
 * @requires express
 * @requires ../controllers/calculator
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/calculator');

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
 * @route DELETE /calculator/stack/arguments
 * @description Remove numbers from the stack
 * @query {number} count - Number of items to remove
 */
router.delete('/stack/arguments', controller.popArgs);

/**
 * @route GET /calculator/stack/operate
 * @description Perform operation using numbers from stack
 * @query {string} operation - Operation to perform
 */
router.get('/stack/operate', controller.stackCalculate);

module.exports = router;