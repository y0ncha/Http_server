/**
 * @module history
 * @description Module for tracking calculator operations history by flavor
 */

/**
 * @typedef {Object} HistoryEntry
 * @property {string} operation - Name of the operation
 * @property {number[]} arguments - Arguments used in the operation
 * @property {number} result - Result of the operation
 */

class History {
    constructor(flavor) {
        /** @type {HistoryEntry[]} */
        this.entries = [];
        this.flavor = flavor;
    }

    /**
     * @description Logs an operation
     * @param {string} op - Operation name
     * @param {number[]} args - Arguments used
     * @param {number} res - Operation result
     */
    addAction(op, args, res) {
        this.entries.push({ flavor: this.flavor, operation: op, arguments: args, result: res });
    }

    /**
     * @description Retrieves the history
     * @returns {HistoryEntry[]}
     */
    fetch() {
        return [...this.entries];
    }

    /**
     * @description Clears all history entries
     */
    clear() {
        this.entries.length = 0;
    }

    /**
     * @description Returns the length of the history
     * @returns {number}
     */
    length() {
        return this.entries.length;
    }
}

// Export two separate history instances
const stackHistory = new History('STACK');
const independentHistory = new History('INDEPENDENT');

module.exports = {
    stackHistory,
    independentHistory
};