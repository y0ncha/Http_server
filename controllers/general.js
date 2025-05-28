/**
 * @module controllers/general
 * @description General calculator-related operations (health, history)
 * @requires ../utils/history
 * @requires ../loggers
 */

const {stackHistory, independentHistory} = require('../utils/history');
const { stackLogger, independentLogger, requestLogger } = require('../loggers');

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
        let result = [];

        if (flavor === 'STACK') {
            stackLogger.info(`History: So far total ${stackHistory.length()} stack actions`);
            result = stackHistory.fetch();
        }
        else if (flavor === 'INDEPENDENT') {
            independentLogger.info(`History: So far total ${independentHistory.length()} independent actions`);
            result = independentHistory.fetch();
        }
        else if (!flavor) {
            result = [...stackHistory.fetch(), ...independentHistory.fetch()];
            stackLogger.info(`History: So far total ${stackHistory.length()} stack actions`);
            independentLogger.info(`History: So far total ${independentHistory.length()} independent actions`);
        }
        else {
            return res.status(409).json({ errorMessage: `Error: unknown flavor: ${flavor}` }); // no need to log this
        }
        res.status(200).json({ result });
    }
    catch (error) {
        res.status(409).json({ errorMessage: error }); // no need to log this
    }
};

/**
 * @function clearHistory
 * @description Clears all history entries
 */
exports.clearHistory = (req, res) => {
    stackHistory.clear();
    independentHistory.clear();
    res.status(200).json({ result: stackHistory.length + independentHistory.length });
};

/**
 * @function getLogLevel
 * @description Gets the current log level of a logger by name
 * @query {string} logger-name - The logger name ('stack' or 'independent')
 */
exports.getLogLevel = (req, res) => {
    const name = req.query['logger-name'];

    if (name === 'stack-logger') {
        res.status(200).json({ level: stackLogger.level.toUpperCase() });
    }
    else if (name === 'independent-logger') {
        res.status(200).json({ level: independentLogger.level.toUpperCase() });
    }
    else if (name === 'request-logger') {
        res.status(200).json({ level: requestLogger.level.toUpperCase() });
    }
    else {
        res.status(409).json({ errorMessage: `Logger '${name}' not found` });
    }
};

/**
 * @function setLogLevel
 * @description Sets the log level of a logger by name
 * @query {string} logger-name - The logger name ('stack' or 'independent')
 * @body {string} level - The new log level (e.g. 'INFO', 'DEBUG')
 */
exports.setLogLevel = (req, res) => {
    const name = req.query['logger-name'];
    let level = req.query.level;

    // Validate the level input
    if (!['debug', 'info', 'error'].includes(level.toLowerCase)) {
        return res.status(409).json({ errorMessage: `Invalid log level: ${level}` });
    }

    // Normalize the level to lowercase for consistency
    level = level.toLowerCase();

    if (name === 'stack-logger') {
        stackLogger.level = level;
        res.status(200).json({ level: stackLogger.level.toUpperCase() });
    }
    else if (name === 'independent-logger') {
        res.status(200).json({ level: independentLogger.level.toUpperCase() });
    }
    else if (name === 'request-logger') {
        res.status(200).json({ level: requestLogger.level.toUpperCase() });
    }
    else {
        res.status(409).json({ errorMessage: `Logger '${name}' not found` });
    }
};