# calculator-api

## Description
This project implements a RESTful API using Node.js and Express to support both stack-based and independent arithmetic operations. The API provides endpoints for manipulating a stack (e.g., push, pop, peek) and for performing standalone calculations (e.g., addition, subtraction).
It includes detailed request logging with Log4js, assigns a unique identifier to each request, and tracks operation history for both modes. Clients can retrieve or clear history, check the server’s health, and dynamically manage logger levels through dedicated endpoints.

## Features
- Handles HTTP requests and responses
- Good practices for system design
- Lightweight and efficient
- Easy to configure
- Supports logging with Winston

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/y0ncha/calculator-api.git
2. Navigate to the project directory:
   ```bash
   cd calculator-api
   ```
3. Install dependencies:
   ```bash
    npm install
    ```
4. Start the server:
   ```bash
   npm start
   ```
