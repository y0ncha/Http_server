# HTTP Server

## Description
This project implements a simple HTTP server using Node.js and Express. It provides endpoints for performing stack operations (push, pop, peek) and independent operations (add, subtract, multiply, divide) with logging capabilities. The server also supports history tracking for both stack and independent operations.

## Features
- Handles HTTP requests and responses
- Good practices for system design
- Lightweight and efficient
- Easy to configure
- Supports logging with Winston

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/y0ncha/http_server.git
2. Navigate to the project directory:
   ```bash
   cd http_server
   ```
3. Install dependencies:
   ```bash
    npm install
    ```
4. Start the server:
   ```bash
   npm start
   ```

## Project Structure
```
project-root/
├── controllers/                  # Business logic
│   └── calculator.js            # Stack + independent handlers
│
├── loggers/                     # All Winston loggers and helpers
│   ├── factory.js               # Shared logger creation logic
│   ├── formatter.js            # Custom log format (assignment-specific)
│   ├── requestLogger.js        # For logging incoming requests
│   ├── stackLogger.js          # For stack operations + history
│   ├── independentLogger.js    # For independent operations + history
│   └── index.js                # Exports all 3 loggers
│
├── logs/                        # Runtime output (created automatically)
│   ├── requests.log
│   ├── stack.log
│   └── independent.log
│
├── middleware/                  # App-level logic
│   └── requestLogger.js        # Logs request entry + duration using requestLogger
│
├── routes/                      # Express route modules
│   ├── stack.js                # /calculator/stack/* + /calculator/history (STACK)
│   ├── independent.js          # /calculator/independent/* + /calculator/history (INDEPENDENT)
│   ├── history.js              # Optional: shared handler for /calculator/history
│   ├── logLevel.js             # GET + PUT /logs/level
│   └── index.js                # (optional) central route mounting file
│
├── utils/                       # Helper modules
│   └── history.js              # History tracking logic (add/fetch/clear)
│
├── .gitignore                   # Ignore /logs/ or node_modules/ if needed
├── package.json                 # NPM dependencies
├── server.js                   # Entry point, mounts routes and starts server
```