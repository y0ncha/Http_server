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
 * @description Retrieves operation history for a given flavor
 * @param {string} flavor - Type of calculation (e.g. 'STACK', 'INDEPENDENT', or others)
 * @returns {HistoryEntry[]} Array of history entries matching the flavor
 */
function fetch(flavor= null) {

    if (flavor === null) {
        return history;
    }
    else {
        return history.filter(entry => entry.flavor === flavor);
    }
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