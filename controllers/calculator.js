const log = require("../log");
const operations = require("../utils/operations");
const operands = require("../utils/stack");

/** @description This function handles the health check request.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object containing the health status.
 * @returns {Object} - A simple "OK" message indicating the service is running.
 **/
exports.health = (req, res) => {
    res.status(200).send("OK");
};

/**
 * @description This function handles the independent calculation request.
 * @param {Object} req - The request object containing the operation and arguments.
 * @param {Object} res - The response object containing the result or error message.
 * @returns {Object} - The result of the operation or an error message.
 * @error - If the operation is unknown or if the number of arguments is incorrect.
 */
exports.independentCalculate = (req, res) => {
    try {
        const args = req.body.arguments;
        const op = req.body.operation;
        const entry = operations.map[op?.toLowerCase()];

        if (!entry) {
            return res.status(409).json({ errorMessage: `Error: unknown operation: ${op}` });
        }
        if (args.length < entry.arity) {
            return res.status(409).json({ errorMessage: `Error: Not enough arguments to perform the operation ${op}` });
        }
        if (args.length > entry.arity) {
            return res.status(409).json({ errorMessage: `Error: Too many arguments to perform the operation ${op}` });
        }
        const result = operations.perform(op, args);
        res.status(200).json({ result });
    } catch (error) {
        res.status(409).json({ errorMessage: error.message });
    }
};

/** @description This function handles the stack size request.
 * @param req - The request object.
 * @param res - The response object containing the size of the stack or an error message.
 * @returns {Object} - The size of the stack.
 */
exports.getStackSize = (req, res) => {
    res.status(200).json({ result: operands.size() });
}

/** @description This function handles the push to stack request.
 * @param req - The request object containing the arguments to be pushed onto the stack.
 * @param res - The response object containing the size of the stack or an error message.
 * @returns {Object} - The current state of the stack.
 */
exports.pushArgs = (req, res) => {
    try {
        const args = req.body.arguments;
        operands.push(args);
        res.status(200).json({ result: operands.size() });
    }
    catch (error) {
        res.status(409).json({ errorMessage: error.message });
    }
}

exports.stackCalculate = (req, res) => {

    const op = req.query.operation;
    const key = op?.toLowerCase();
    const entry = operations.map[key];

    if (!entry) {
        return res.status(409).json({ errorMessage: `Error: unknown operation: ${op}` });
    }
    if (entry.arity > operands.size()) {
        return res.status(409).json({ errorMessage: `Error: cannot implement operation ${op}. It requires ${entry.arity} arguments and the stack has only ${operands.size()} arguments` });
    }

    try {
        const args = operands.pop(entry.arity);
        const result = operations.perform(op, args);
        res.status(200).json({ result });
    } catch (error) {
        res.status(409).json({ errorMessage: String(error) });
    }
};

/**
 * @description This function handles a calculation based on values from the stack.
 * It validates the operation and stack size, then pops the arguments and performs the operation.
 * @param {Object} req - The request object, expects operation as a query param.
 * @param {Object} res - The response object containing the result or an error message.
 * @returns {Object} - The result of the operation or an error message error.
 * @error - If the operation is unknown or if the there or not enough arguments in the stack.
 */
exports.stackCalculate = (req, res) => {
    const op = req.query.operation;
    const key = op?.toLowerCase();
    const entry = operations.map[key];

    if (!entry) {
        return res.status(409).json({
            errorMessage: `Error: unknown operation: ${op}`
        });
    }

    const stackSize = operands.size();
    if (entry.arity > stackSize) {
        return res.status(409).json({
            errorMessage: `Error: cannot implement operation ${op}. It requires ${entry.arity} arguments and the stack has only ${stackSize} arguments`
        });
    }

    try {
        const args = operands.pop(entry.arity);
        const result = operations.perform(op, args);
        res.status(200).json({ result });
    } catch (error) {
        res.status(409).json({ errorMessage: error.message });
    }
};

/**
 * @description This function handles the pop from stack request.
 * @param req - The request object containing the number of arguments to be popped from the stack (query).
 * @param res - The response object containing the size of the stack or an error message.
 * @returns {Object} - The size of the stack after popping the arguments.
 * @error - If the number of arguments to be popped is invalid or exceeds the stack size.
 */
exports.popArgs = (req, res) => {
    const count = req.query.count;
    try {
        operands.pop(count);
        res.status(200).json({ result: operands.size() });
    } catch (error) {
        res.status(409).json({ errorMessage: error.message });
    }
}

/**
 * @description This function handles the history request.
 * @param req - The request object containing flavor (query) STACK | INDEPENDENT.
 * @param res - The response object containing the history of operations or an error message.
 * @returns {Object} - The history of operations.
 */
