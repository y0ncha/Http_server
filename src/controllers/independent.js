/**
 * @module controllers/independent
 * @description Independent (non-stack) calculator operations
 * @requires ../utils/operations
 * @requires ../utils/history
 * @requires ../loggers
 */

const operations = require('../utils/operations');
const {independentHistory: history} = require('../utils/history');
const { independentLogger: logger } = require('../loggers');

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

        if (!opEntry) { // check if operation exists
            const error = `Error: unknown operation: ${op}`;
            logger.error(`Server encountered an error ! message: ${error}`);
            return res.status(409).json({ errorMessage: error});
        }
        if (args.length < opEntry.arity) { // check if enough arguments are provided
            const error = `Error: Not enough arguments to perform the operation ${op}`;
            logger.error(`Server encountered an error ! message: ${error}`);
            return res.status(409).json({ errorMessage: `Error: Not enough arguments to perform the operation ${op}` });
        }
        if (args.length > opEntry.arity) { // check if too many arguments are provided
            const error = `Error: Too many arguments to perform the operation ${op}`;
            logger.error(`Server encountered an error ! message: ${error}`);
            return res.status(409).json({ errorMessage: error });
        }

        const result = operations.perform(opKey, args);
        history.addAction(op, args, result);

        logger.info(`Performing operation ${op}. Result is ${result}`);
        res.status(200).json({ result });

        logger.debug(`Performing operation: ${op}(${args.join(',')}) = ${result}`);

    }
    catch (error) {
        logger.error(`Server encountered an error ! message: ${error}`);
        res.status(409).json({ errorMessage: error });
    }
};