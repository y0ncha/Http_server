/**
 * @module log
 * @description Debug logging utility module
 */

/**
 * @type {boolean}
 * @description Flag to enable/disable debug logging
 */
const DEBUG_MODE = false;

/**
 * @description Logs a debug message with timestamp if debug mode is enabled
 * @param {string} msg - Message to log
 * @example
 * debug('Processing request...') // outputs: [2024-03-21T10:30:15.123Z] Processing request...
 */
function debug(msg) {
    if (DEBUG_MODE) {
        const time = new Date().toISOString();
        console.log(`[${time}] ${msg}`);
    }
}

module.exports = {
    DEBUG_MODE,
    debug
};