/**
 * @module controllers/general
 * @description General calculator-related operations (health, history)
 * @requires ../utils/history
 * @requires ../loggers
 */

const history = require('../utils/history');
const { stackLogger, independentLogger } = require('../loggers');

/**
 * @function health
 * @description Health check endpoint
 */
exports.health = (req, res) => {
    res.status(200).send("OK");
};

/**
 * @function fetchHistory
 * @description Retrieves calculation history based on flavor
 */

exports.fetchHistory = (req, res) => {
    const flavor = req.query.flavor;

    try {
        let result;

        if (!flavor) {
            result = [...history.fetch()];
        }
        else if (flavor === 'STACK') {
            result = history.fetch(flavor);
        }
        else if (flavor === 'INDEPENDENT') {
            result = history.fetch(flavor);
        }
        else {
            return res.status(409).json({errorMessage: `Error: unknown flavor: ${flavor}`});
        }
        res.status(200).json({ result });
    }
    catch (error) {
        res.status(409).json({ errorMessage: error });
    }
};

/**
 * @function clearHistory
 * @description Clears all history entries
 */
exports.clearHistory = (req, res) => {
    history.clear();
    res.status(200).json({ result: history.size() });
};