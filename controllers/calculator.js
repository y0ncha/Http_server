/**
 * @module controllers/calculator
 * @description Controller functions for calculator operations
 * @requires ../utils/history
 * @requires ../utils/operations
 * @requires ../utils/stack
 */

const history = require("../utils/history");
const operations = require("../utils/operations");
const operands = require("../utils/stack");

/**
 * @typedef {Object} CalculatorResponse
 * @property {(number|HistoryEntry[])} [result] - Operation result (for successful responses) or array of history entries
 * @property {string} [errorMessage] - Error message (for error responses)
 */

/**
 * @typedef {Object} CalculationRequest
 * @property {string} operation - Operation to perform (plus, minus, times, etc.)
 * @property {number[]} arguments - Array of integers for the operation
 */

/**
 * @function health
 * @description Health check endpoint
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {void} Sends "OK" with 200 status
 */
exports.health = (req, res) => {
    res.status(200).send("OK");
};

/**
 * @function independentCalculate
 * @description Performs calculation with provided arguments
 * @param {import('express').Request<{}, {}, CalculationRequest>} req - Express request
 * @param {import('express').Response<CalculatorResponse>} res - Express response
 * @returns {void} Sends result or error message
 */
exports.independentCalculate = (req, res) => {
    try {
        const args = req.body.arguments;
        const op = req.body.operation;
        const opKey = op?.toLowerCase();
        const opEntry = operations.map[opKey];

        if (!opEntry) {
            return res.status(409).json({ errorMessage: `Error: unknown operation: ${op}` });
        }
        if (args.length < opEntry.arity) {
            return res.status(409).json({ errorMessage: `Error: Not enough arguments to perform the operation ${op}` });
        }
        if (args.length > opEntry.arity) {
            return res.status(409).json({ errorMessage: `Error: Too many arguments to perform the operation ${op}` });
        }
        const result = operations.perform(opKey, args);
        history.addAction('INDEPENDENT', opKey, args, result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(409).json({ errorMessage: error });
    }
};

/**
 * @function getStackSize
 * @description Returns current stack size
 * @param {import('express').Request} req - Express request
 * @param {import('express').Response<CalculatorResponse>} res - Express response
 * @returns {void} Sends stack size
 */
exports.getStackSize = (req, res) => {
    res.status(200).json({ result: operands.size() });
}

/**
 * @function pushArgs
 * @description Pushes numbers onto the stack
 * @param {import('express').Request} req - Express request with arguments array
 * @param {import('express').Response<CalculatorResponse>} res - Express response
 * @returns {void} Sends new stack size or error
 */
exports.pushArgs = (req, res) => {
    try {
        const args = req.body.arguments;
        operands.push(args);
        res.status(200).json({ result: operands.size() });
    }
    catch (error) {
        res.status(409).json({ errorMessage: error });
    }
}

/**
 * @function stackCalculate
 * @description Performs operation using numbers from stack
 * @param {import('express').Request} req - Express request with operation query
 * @param {import('express').Response<CalculatorResponse>} res - Express response
 * @returns {void} Sends operation result or error
 */
exports.stackCalculate = (req, res) => {

    const op = req.query.operation;
    const opKey = op?.toLowerCase();
    const opEntry = operations.map[opKey];

    if (!opEntry) {
        return res.status(409).json({ errorMessage: `Error: unknown operation: ${op}` });
    }
    if (opEntry.arity > operands.size()) {
        return res.status(409).json({ errorMessage: `Error: cannot implement operation ${op}. It requires ${opEntry.arity} arguments and the stack has only ${operands.size()} arguments` });
    }

    try {
        const args = operands.pop(opEntry.arity);
        const result = operations.perform(opKey, args);
        history.addAction('STACK', opKey, args, result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(409).json({ errorMessage: String(error) });
    }
};

/**
 * @function popArgs
 * @description Removes numbers from the stack
 * @param {import('express').Request} req - Express request with count query
 * @param {import('express').Response<CalculatorResponse>} res - Express response
 * @returns {void} Sends new stack size or error
 */
exports.popArgs = (req, res) => {
    const count = req.query.count;
    try {
        operands.pop(count);
        res.status(200).json({ result: operands.size() });
    } catch (error) {
        res.status(409).json({ errorMessage: error });
    }
}

/**
 * @function fetchHistory
 * @description Retrieves calculation history
 * @param {import('express').Request} req - Express request with optional flavor query
 * @param {import('express').Response<CalculatorResponse>} res - Express response
 * @returns {void} Sends history entries
 */
exports.fetchHistory = (req, res) => {
    const flavor = req.query.flavor;
    const result = history.fetch(flavor);
    res.status(200).json({ result });
}

/**
 * @function clearHistory
 * @description Clears all history entries
 * @param {import('express').Request} req - Express request
 * @param {import('express').Response<CalculatorResponse>} res - Express response
 * @returns {void} Sends success message
 */
exports.clearHistory = (req, res) => {
    history.clear();
    res.status(200).json({ result: history.size() });
}