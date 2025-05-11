/**
 * @module operations
 * @description A calculator module that provides basic arithmetic operations
 */

/**
 * @typedef {Object} OperationEntry
 * @property {number} arity - Number of arguments the operation requires
 * @property {Function} fn - Function implementing the operation
 */

/**
 * @type {Object.<string, OperationEntry>}
 * @description Map of supported operations and their implementations
 */
const map = {
    plus: {
        arity: 2,
        fn: (x, y) => x + y
    },
    minus: {
        arity: 2,
        fn: (x, y) => x - y
    },
    times: {
        arity: 2,
        fn: (x, y) => x * y
    },
    divide: {
        arity: 2,
        fn: (x, y) => {
            // Using Math.trunc to ensure integer division
            // This matches behavior of many programming languages
            if (y === 0) throw `Error while performing operation Divide: division by 0`;
            return Math.trunc(x / y);
        }
    },
    pow: {
        arity: 2,
        fn: (x, y) => x ** y
    },
    abs: {
        arity: 1,
        fn: x => Math.abs(x)
    },
    fact: {
        arity: 1,
        fn: x => {
            if (x < 0) throw `Error while performing operation Factorial: not supported for the negative number`;
            return factorial(x);
        }
    }
};

/**
 * @description Performs the requested arithmetic operation on the given arguments
 * @param {string} op - Operation name (plus, minus, times, divide, pow, abs, fact)
 * @param {number[]} args - Array of integer arguments for the operation
 * @returns {number} Result of the operation
 * @throws {string} Error message if:
 *                  - Operation is unknown
 *                  - Division by zero is attempted
 *                  - Factorial of negative number is requested
 * @example
 * perform('plus', [1, 2]) // returns 3
 * perform('divide', [10, 2]) // returns 5
 */
function perform(op, args) {
    const entry = map[op];

    if (!entry) {
        throw `Error: unknown operation: ${op}`;
    }

    try {
        return entry.fn(...args);
    } catch (error) {
        throw error;
    }
}

/**
 * @description Calculates the factorial of a non-negative integer
 * @param {number} n - Non-negative integer
 * @returns {number} Factorial of n
 * @private
 */
function factorial(n) {
    return n === 0 ? 1 : n * factorial(n - 1);
}

module.exports = { map, perform };