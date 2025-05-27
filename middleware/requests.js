/**
 * @module request
 * @description Logs incoming requests and their durations (INFO + DEBUG)
 * @requires loggers
 */

const { requestLogger } = require('../loggers');

let reqCount = 1;

/**
 * @function logReq
 * @description Express middleware that logs each request start and duration
 */
function logReq(req, res, next) {
    const reqId = reqCount++;
    req._id = reqId;
    const start = Date.now();

    // This message appears for each incoming request, and before it is processed
    requestLogger.info(
        `Incoming request | #${reqId} | resource: ${req.originalUrl} | HTTP Verb ${req.method.toUpperCase()} | request #${reqId}`
    );

    // This message appears after the request ends (as it measures its time)
    res.on('finish', () => {
        const duration = Date.now() - start;
        requestLogger.debug(`request #${reqId} duration: ${duration}ms | request #${reqId}`);
    });

    next();
}

module.exports = logReq;