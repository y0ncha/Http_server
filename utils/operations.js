
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
 * @description This function performs the requested operation on the given arguments.
 * @param op - The operation to be performed.
 * @param args - The operands for the operation.
 * @returns {number} - The result of the operation.
 * @throws {string} - If the operation is arithmetically invalid.
 */
function perform(op, args) {
    const key = op?.toLowerCase();
    const entry = map[key];

    try {
        return entry.fn(...args);
    } catch (error) {
        throw error;
    }
}

function factorial(n) {
    return n === 0 ? 1 : n * factorial(n - 1);
}

module.exports = { map, perform };


