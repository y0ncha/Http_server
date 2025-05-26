/**
 * @module routes/independent
 * @description Express router configuration for independent calculator endpoints
 * @requires express
 * @requires ../controllers/calculator
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/calculator');

/**
 * @route POST /calculator/independent/calculate
 * @description Perform independent calculation
 * @body {Object} request
 * @body {string} request.operation - Operation to perform
 * @body {number[]} request.arguments - Arguments to use in the calculation
 */
router.post('/independent/calculate', controller.independentCalculate);

module.exports = router;