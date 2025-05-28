/**
 * @class Stack
 * @description A stack data structure implementation for integer operations
 * @example
 * const stack = new Stack();
 * stack.push([1, 2, 3]); // Adds numbers to stack
 * stack.pop(2); // Returns [3, 2]
 */

class Stack {
    /**
     * Creates a new Stack instance
     * @constructor
     */
    constructor() {
        this._items = [];
    }

    /**
     * @description Pushes multiple integers onto the stack
     * @param {number[]} args - Array of integers to push
     * @throws {string} If args is not an array or contains non-integers
     */
    push(args) {
        if (!Array.isArray(args)) {
            throw "Invalid or missing 'arguments' array";
        }
        if (args.some(arg => !Number.isInteger(arg))) {
            throw "All arguments must be integers";
        }
        this._items.push(...args);
    }

    /**
     * @description Removes and returns multiple items from the top of the stack
     * @param {number} count - Number of items to remove
     * @returns {number[]} Array of removed items in reverse order
     * @throws {string} If count is invalid or larger than stack length
     */
    pop(count) {
        const size = this._items.length;
        if (!Number.isInteger(count) || count < 0 || count > size) {
            throw `Error: cannot remove ${count} from the stack. It has only ${size} arguments`;
        }
        return this._items.splice(-count).reverse();
    }

    /**
     * @description Gets the current number of items in the stack
     * @returns {number} Stack length
     */
    size() {
        return this._items.length;
    }

    /**
     * @description Gets the current items in the stack as a string
     * @returns {string} Array of items in the stack
     */
    stringify() {
        return `${this._items.join(', ')}`;
    }

    /**
     * @description Removes all items from the stack
     */
    clear() {
        this._items.length = 0;
    }
}

module.exports = new Stack();  // Singleton instance
