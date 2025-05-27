/**
 * @module loggers
 * @description Initializes and exports all loggers using log4js
 * @requires log4js
 */

const loggers = require('log4js');
const fs = require('fs');
const path = require('path');

// Ensure the logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// Logging level configuration
let LOG_LEVEL = 'debug';

// Define '{date-time} {log-level}: {log-message} | request #{request-number}' as the standard log format
const layout = {
    type: 'pattern',
    pattern: '%d{dd-MM-yyyy HH:mm:ss.SSS} %p: %m'
}

// Configure log4js with multiple appenders and logger categories
loggers.configure({
    appenders: {
        request: { type: 'file', filename: 'logs/requests.log', layout: layout },
        stack: { type: 'file', filename: 'logs/stack.log', layout: layout},
        independent: { type: 'file', filename: 'logs/independent.log', layout: layout },
        console: { type: 'console', layout: layout}
    },
    categories: {
        // Default logger configuration
        default: {
            appenders: ['console'],
            level: LOG_LEVEL || 'info'
        },

        // In charge of logging each incoming request of any type to the server
        'request-logger': {
            appenders: ['request', 'console'],
            level: LOG_LEVEL || 'debug'
        },
        // In charge of logging information on all the stack behavior
        'stack-logger': {
            appenders: ['stack'],
            level: LOG_LEVEL || 'info'
        },
        // In charge of logging information on all the independent behavior
        'independent-logger': {
            appenders: ['independent'],
            level: LOG_LEVEL || 'info'
        }
    }
});

// Export initialized loggers

/**
 * @constant {Logger} requestLogger
 * @description In charge of logging each incoming request of any type to the server
 */
const requestLogger = loggers.getLogger('request-logger');

/**
 * @constant {Logger} stackLogger
 * @description In charge of logging information on all the stack behavior
 */
const stackLogger = loggers.getLogger('stack-logger');

/**
 * @constant {Logger} independentLogger
 * @description In charge of logging information on all the independent behavior
 */
const independentLogger = loggers.getLogger('independent-logger');

module.exports = {
    requestLogger,
    stackLogger,
    independentLogger
};