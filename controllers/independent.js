/**
 * @module controllers/independent
 * @description Independent (non-stack) calculator operations
 * @requires ../utils/operations
 * @requires ../utils/history
 */

const operations = require('../utils/operations');
const history = require('../utils/history');

/**
 * @function independentCalculate
 * @description Performs calculation with provided arguments
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
        history.addAction('INDEPENDENT', op, args, result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(409).json({ errorMessage: error });
    }
};