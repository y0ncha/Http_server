/**
 * @module loggers
 * @description Initializes and exports all loggers using log4js
 * @requires log4js
 * @requires fs
 * @requires path
 */

const loggers = require('log4js');
const fs = require('fs');
const path = require('path');

// Ensure the logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// Define '{date-time} {log-level}:' layout
const layout = {
    type: 'pattern',
    pattern: '%d{dd-MM-yyyy HH:mm:ss.SSS} %p: %m'
}

// Configure log4js with multiple appenders and logger categories
loggers.configure({
    appenders: {
        request: {
            type: 'file',
            filename: 'logs/requests.log',
            layout: layout
        },
        stack: {
            type: 'file',
            filename: 'logs/stack.log',
            layout: layout
        },
        independent: {
            type: 'file',
            filename: 'logs/independent.log',
            layout: layout
        },
        console: {
            type: 'console',
            layout: layout,
        }
    },
    categories: {
        // Default logger configuration
        default: {
            appenders: ['console'],
            level: 'info'
        },
        // In charge of logging each incoming request of any type to the server
        'request-logger': {
            appenders: ['request', 'console'],
            level: 'info'
        },
        // In charge of logging information on all the stack behavior
        'stack-logger': {
            appenders: ['stack'],
            level: 'info'
        },
        // In charge of logging information on all the independent behavior
        'independent-logger': {
            appenders: ['independent'],
            level: 'debug'
        }
    }
});

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
    stackLogger: stackLogger,
    independentLogger,
}