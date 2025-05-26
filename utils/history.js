/**
 * @module history
 * @description Module for tracking calculator operations history
 */

/**
 * @typedef {Object} HistoryEntry
 * @property {'STACK'|'INDEPENDENT'} flavor - Type of calculation performed
 * @property {string} operation - Name of the operation
 * @property {number[]} arguments - Arguments used in the operation
 * @property {number} result - Result of the operation
 */

/** @type {HistoryEntry[]} */
const history = [];

/**
 * @description Logs an operation to the history
 * @param {'STACK'|'INDEPENDENT'} flavor - Type of calculation
 * @param {string} op - Operation name
 * @param {number[]} args - Arguments used
 * @param {number} res - Operation result
 */
function addAction(flavor, op, args, res) {
    history.push({
        flavor: flavor,
        operation: op,
        arguments: args,
        result: res
    });
}

/**
 * @description Retrieves operation history
 * @param {'STACK'|'INDEPENDENT'|null} [flavor=null] - Filter by calculation type
 * @returns {HistoryEntry[]} Array of history entries
 * @throws {string} If an unknown flavor is provided
 * @example
 * // Get all history
 * fetch()
 * // Get only stack operations
 * fetch('STACK')
 */
function fetch(flavor = null) {

    let result;

    if (flavor === 'STACK' || flavor === 'INDEPENDENT') { // If flavor is provided, return the history for that flavor.
        result = history.filter(entry => entry.flavor === flavor);
    }
    else if (!flavor) {  // If flavor is not provided, return the entire history (stack first).
        result = [...history.filter(entry => entry.flavor === 'STACK'),...history.filter(entry => entry.flavor === 'INDEPENDENT')];
    }
    else {
        throw `Error: unknown flavor: ${flavor}`;
    }
    return result;
}

/**
 * @description Clears all history entries
 */
function clear() {
    history.length = 0;
}

/**
 * @description Clears history
 */
function size() {
    return history.length;
}

module.exports = {
    addAction,
    fetch,
    clear,
    size
};