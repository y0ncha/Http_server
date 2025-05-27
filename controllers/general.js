/**
 * @module controllers/general
 * @description General calculator-related operations (health, history)
 * @requires ../utils/history
 */

const history = require('../utils/history');

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
        const result = history.fetch(flavor);
        res.status(200).json({ result });
    } catch (error) {
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