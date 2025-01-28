# IMF Gadget API

The **IMF Gadget API** is a secure API designed for managing the Impossible Missions Force's gadget inventory. It includes endpoints for authentication, gadget creation, retrieval, updates, and decommissioning. Additionally, it supports initiating self-destruct sequences for gadgets.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Authentication](#authentication)

---

## Features
- **Authentication**: Secure login with JWT token generation.
- **Gadget Inventory Management**:
  - Create, retrieve, update, and delete gadgets.
  - Filter gadgets by their status.
- **Self-Destruct**: Initiate a self-destruct sequence for any gadget.
- **Swagger Documentation**: API documentation available at `/api-docs`.

---

## Prerequisites
- [Node.js](https://nodejs.org/) (v20.18.2)
- [npm](https://www.npmjs.com/) (v10.8)
- A running instance of a database compatible with [Prisma](https://www.prisma.io/) (e.g., PostgreSQL, MySQL).

---

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/FazilKlkt/upraised-test
   cd upraised-test
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Env Variables:
4. Setup Database using Prisma:
   ```bash
   npx prisma migrate dev --name init
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Environment Variables

1. Create a .env file in the root directory with the following values::
   ```bash
   DATABASE_URL=your_database_connection_string
   PORT=3000
   JWT_SECRET=your_jwt_secret
   ```

## Authentication: 
NOTE:*Username & Password is static in this server*
1. Request Body:
   ```bash
    {
        "username": "imf",
        "password": "secret"
    }
   ```
1. Response:
   ```bash
    {
         "token": "your_jwt_token_here"
    }
   ```
