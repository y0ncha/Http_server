
const stack = [];

function pushArgs(args) {
    if (!Array.isArray(args)) {
        throw "Invalid or missing 'arguments' array";
    }
    if (args.some(arg => !Number.isInteger(arg))) {
        throw "All arguments must be integers";
    }
    stack.push(...args);
}

function popArgs(count) {

    const size = stack.length;
    if (!Number.isInteger(count) || count < 0 || count > size) {
        throw `Error: cannot remove ${count} from the stack. It has only ${size} arguments`;
    }
    return stack.splice(-count).reverse();
}

function size() {
    return stack.length;
}

module.exports = { pushArgs, popArgs, size };