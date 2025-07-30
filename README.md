# InsuredMine Assessment

A Node.js RESTful API for managing insurance policies, users, agents, carriers, categories, and scheduled messages. Built with Express, MongoDB (Mongoose), and supports file uploads and background processing using Worker Threads.

## Features

- Upload user and policy data via CSV/XLSX
- Manage users, agents, carriers, categories, and policies
- Schedule messages to be sent at a specific time
- Retrieve user and policy information via REST API
- Uses worker threads for efficient file parsing
- CPU usage monitoring and automatic server restart

## Prerequisites

- Node.js (v18 or above recommended)
- npm
- MongoDB Atlas account (or local MongoDB)

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory with the following:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
```

## Running the Application

```bash
npm start
```

The server will start on `http://localhost:3000` by default.

## API Endpoints

### User & Policy APIs

- `POST /api/user/upload` — Upload CSV/XLSX file with user & policy data
  ```json
  {
    "file": "<file_path>"
  }
  ```
- `GET /api/users/` — Get all user account names
- `GET /api/policyinfo/?username=<account_name>` — Get policy info for a user
- `GET /api/all-policies/` — Get all user policies

### Message APIs

- `POST /api/message/add-message` — Schedule a message
  ```json
  {
    "message": "Your policy is due for renewal.",
    "day": "2025-08-01",
    "time": "14:30"
  }
  ```

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- Worker Threads
- Multer (file uploads)
- node-schedule (task scheduling)
- XLSX & CSV parsing
- dotenv, cors, moment, pidusage
