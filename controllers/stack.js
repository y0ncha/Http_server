/**
 * @module controllers/stack
 * @description Stack-based calculator logic
 * @requires ../utils/stack
 * @requires ../utils/operations
 * @requires ../utils/history
 */

const stack = require('../utils/stack');
const operations = require('../utils/operations');
const history = require('../utils/history');

/**
 * @function getStackSize
 * @description Returns current stack size
 */
exports.getStackSize = (req, res) => {
    res.status(200).json({ result: stack.size() });
};

/**
 * @function pushArgs
 * @description Pushes numbers onto the stack
 */
exports.pushArgs = (req, res) => {
    try {
        const args = req.body.arguments;
        stack.push(args);
        res.status(200).json({ result: stack.size() });
    } catch (error) {
        res.status(409).json({ errorMessage: error });
    }
};

/**
 * @function stackCalculate
 * @description Performs operation using numbers from stack
 */
exports.stackCalculate = (req, res) => {
    const op = req.query.operation;
    const opKey = op?.toLowerCase();
    const opEntry = operations.map[opKey];

    if (!opEntry) {
        return res.status(409).json({ errorMessage: `Error: unknown operation: ${op}` });
    }
    if (opEntry.arity > stack.size()) {
        return res.status(409).json({
            errorMessage: `Error: cannot implement operation ${op}. It requires ${opEntry.arity} arguments and the stack has only ${stack.size()} arguments`
        });
    }

    try {
        const args = stack.pop(opEntry.arity);
        const result = operations.perform(opKey, args);
        history.addAction('STACK', op, args, result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(409).json({ errorMessage: String(error) });
    }
};

/**
 * @function popArgs
 * @description Removes numbers from the stack
 */
exports.popArgs = (req, res) => {
    try {
        const count = req.query.count;
        stack.pop(count);
        res.status(200).json({ result: stack.size() });
    } catch (error) {
        res.status(409).json({ errorMessage: error });
    }
};