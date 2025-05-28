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
const { stackLogger } = require('../loggers');

/**
 * @function getStackSize
 * @description Returns current stack size
 */
exports.getStackSize = (req, res) => {
    const size = stack.size();

    stackLogger.info(`Stack size is ${size}`);

    res.status(200).json({ result: size });
    stackLogger.debug( `Stack content (first == top): [${stack.stringify()}]`)
};

/**
 * @function pushArgs
 * @description Pushes numbers onto the stack
 */
exports.pushArgs = (req, res) => {
    try {
        const args = req.body.arguments;
        let len = args.length;
        let size = stack.size();

        stackLogger.info(`Adding total of ${len} argument(s) to the stack | Stack size: ${size + len}`);
        stack.push(args);

        res.status(200).json({ result: stack.size() });
        stackLogger.debug(`Adding arguments: ${args.join(', ')} | Stack size before ${size} | stack size after ${stack.size()}`);
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

        stackLogger.info(`Performing operation ${op}. Result is ${result} | stack size: ${stack.size()}`)
        history.addAction('STACK', op, args, result);

        res.status(200).json({ result });
        stackLogger.debug(`Performing operation: ${op}(${args.join(', ')}) = ${result}`)
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