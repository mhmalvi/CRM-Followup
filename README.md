# CRM Follow-Up Service

A dedicated microservice within the CRM ecosystem responsible for managing follow-up reminders and real-time notifications. This service enables CRM users to schedule, track, and receive timely follow-up alerts for their leads and contacts.

## Overview

The CRM Follow-Up Service handles the complete lifecycle of follow-up tasks — from creation and scheduling to real-time delivery via WebSockets. It ensures that sales and support teams never miss a critical follow-up by pushing time-sensitive notifications directly to connected clients.

## Key Features

- **Follow-Up Management** — Create, update, list, and delete follow-up reminders with configurable notification times
- **Real-Time Notifications** — Push follow-up alerts to connected users via Socket.IO when scheduled times are reached
- **Status Tracking** — Mark notifications as viewed or change their active/inactive status
- **User-Scoped Data** — All follow-ups are scoped per user, ensuring data isolation across CRM team members
- **Time-Based Filtering** — Automatically filters and delivers only due notifications based on timestamp comparison

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Real-Time:** Socket.IO
- **Database:** MySQL
- **Scheduling:** node-cron
- **Validation:** express-validator
- **Date Handling:** Moment.js, date-fns, date-and-time
- **HTTP Client:** Axios
- **Environment Config:** dotenv

## API Endpoints

All endpoints are prefixed with `/api`.

| Method | Endpoint                  | Description                              |
|--------|---------------------------|------------------------------------------|
| POST   | `/api/follow-up`          | Create a new follow-up reminder          |
| PUT    | `/api/follow-up-update`   | Update an existing follow-up             |
| POST   | `/api/follow-up-by-user`  | Get all follow-ups for a specific user   |
| POST   | `/api/notifications-list` | List past notifications for a user       |
| POST   | `/api/change-status`      | Toggle notification active/inactive status |
| POST   | `/api/delete-notification`| Delete a notification                    |
| POST   | `/api/notification-view`  | Mark notifications as viewed             |
| POST   | `/api/notification-fetch` | Fetch all follow-ups for a user          |

### WebSocket Events

| Event     | Direction       | Description                                      |
|-----------|-----------------|--------------------------------------------------|
| `message` | Client → Server | Send user ID to request due notifications        |
| `message` | Server → Client | Receive array of follow-ups whose time has passed |

## Prerequisites

- Node.js (v14 or higher)
- MySQL server with a `crm_user` database
- A `follow_ups` table in the database

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mhmalvi/CRM-Followup.git
   cd CRM-Followup
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the project root:
   ```env
   DB_USERNAME=your_mysql_username
   DB_PASSWORD=your_mysql_password
   ```

4. **Start the service:**
   ```bash
   npm start
   ```

   The service will start on port **7000** by default.

## Database Schema

The service operates on a `follow_ups` table with the following structure:

| Column              | Type     | Description                        |
|---------------------|----------|------------------------------------|
| `id`                | INT (PK) | Auto-increment primary key        |
| `title`             | VARCHAR  | Follow-up title                   |
| `start`             | DATETIME | Start date/time                   |
| `end`               | DATETIME | End date/time                     |
| `description`       | TEXT     | Follow-up details                 |
| `user_id`           | INT      | Associated CRM user               |
| `priority`          | INT      | Priority level                    |
| `status`            | INT      | Active (1) or viewed (0)          |
| `notification_time` | DATETIME | When to trigger the notification  |
| `created_at`        | DATETIME | Record creation timestamp         |
| `updated_at`        | DATETIME | Last update timestamp             |

## Architecture

This service is part of a larger **CRM microservices architecture**. It operates as an independent service with its own database connection and can be deployed, scaled, and maintained independently. It communicates with other CRM services as needed via HTTP and real-time WebSocket channels.

## License

ISC
