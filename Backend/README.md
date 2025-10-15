# Node.js URL Shortener

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

A simple and efficient URL shortener service built with Node.js, Express, and MongoDB. This application provides a RESTful API to create both permanent and temporary shortened URLs.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Create a Permanent Short URL](#create-a-permanent-short-url)
  - [Create a Temporary Short URL](#create-a-temporary-short-url)
  - [Redirect to Original URL](#redirect-to-original-url)
  - [Get All URLs for a User](#get-all-urls-for-a-user)
  - [Delete a URL](#delete-a-url)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

-   **Permanent URLs:** Convert long URLs into short, easy-to-share tiny URLs that are associated with a user ID.
-   **Temporary URLs:** Create anonymous, short-lived URLs that automatically expire and are deleted after 2 days.
-   **Fast Redirects:** Quickly redirects both permanent and temporary short URLs to their original destination.
-   **User-specific Link Management:** Associates permanent shortened URLs with a user ID.

## Tech Stack

-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB with Mongoose
-   **Dependencies:**
    -   `cors`: For handling Cross-Origin Resource Sharing.
    -   `dotenv`: For managing environment variables.
    -   `mongoose`: For object data modeling with MongoDB.
    -   `nanoid`: For generating unique, short URL IDs.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v14 or later)
-   [npm](https://www.npmjs.com/)
-   [MongoDB](https://www.mongodb.com/try/download/community) (or a cloud-hosted MongoDB instance)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/abvsng/LinkShort-w-analytics.git
    cd LinkShort-w-analytics/Backend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Configure environment variables:**
    Create a `.env` file in the `Backend` directory by copying the example file:
    ```sh
    cp .env.example .env
    ```
    Open the `.env` file and add your MongoDB connection string.

    ```
    DB_URI=your_mongodb_connection_string
    ```

### Running the Application

To start the server, run the following command from the `Backend` directory:

```sh
npm start
```

The server will start on `http://localhost:3000`.

## API Endpoints

### Health Check

A simple endpoint to verify that the service is running.

-   **Endpoint:** `GET /`
-   **Successful Response (200):**
    -   Content-Type: `text/html`
    -   Body: `Hello World!`

### Create a Permanent Short URL

Creates a new permanent short URL associated with a user.

-   **Endpoint:** `POST /api/shorten`
-   **Request Body:**
    ```json
    {
      "url": "https://your-long-url.com/with/a/very/long/path",
      "userId": "some-user-id"
    }
    ```
-   **Successful Response (201):**
    ```json
    {
      "success": true,
      "message": "user created and URL added to DB",
      "tinyUrl": "generated-tiny-url"
    }
    ```
-   **Error Response (400):**
    ```json
    {
        "success": false,
        "message": "Url is required"
    }
    ```

### Create a Temporary Short URL

Creates a new temporary short URL that expires after 2 days.

-   **Endpoint:** `POST /api/shorten-temp`
-   **Request Body:**
    ```json
    {
      "url": "https://your-long-url.com/with/a/very/long/path"
    }
    ```
-   **Successful Response (201):**
    ```json
    {
      "success": true,
      "message": "Temporary URL added to DB, will expire in 2 days.",
      "tinyUrl": "generated-tiny-url"
    }
    ```
-   **Error Response (400):**
    ```json
    {
        "success": false,
        "message": "Url is required"
    }
    ```

### Redirect to Original URL

Redirects to the original long URL corresponding to the provided `tinyUrl`. This works for both permanent and temporary URLs.

-   **Endpoint:** `GET /api/:tinyUrl`
-   **URL Parameter:**
    -   `tinyUrl` (string, required): The short ID of the URL.
-   **Action:** 302 Redirect to the original URL.
-   **Error Response (404):**
    ```json
    {
      "success": false,
      "message": "URL not found"
    }
    ```

### Get All URLs for a User

Retrieves a list of all permanent URLs associated with a specific user.

-   **Endpoint:** `POST /api/userData`
-   **Request Body:**
    ```json
    {
      "userId": "some-user-id"
    }
    ```
-   **Successful Response (200):**
    ```json
    [
        {
            "tinyUrl": "generated-tiny-url-1",
            "longUrl": "https://your-long-url-1.com"
        },
        {
            "tinyUrl": "generated-tiny-url-2",
            "longUrl": "https://your-long-url-2.com"
        }
    ]
    ```
-   **Error Response (404):**
    ```json
    {
      "success": false,
      "message": "User not found"
    }
    ```

### Delete a URL

Deletes a permanent URL from a user's account and the central pointer collection.

-   **Endpoint:** `DELETE /api/url`
-   **Request Body:**
    ```json
    {
      "tinyUrl": "the-short-url-to-delete",
      "userId": "some-user-id"
    }
    ```
-   **Successful Response (200):**
    ```json
    {
      "success": true,
      "message": "URL deleted successfully."
    }
    ```
-   **Error Responses (400, 404):**
    ```json
    {
      "success": false,
      "message": "tinyUrl is required"
    }
    ```
    ```json
    {
      "success": false,
      "message": "URL not found or user does not have permission to delete it."
    }
    ```

## Project Structure

```
.
├── db/
│   ├── dbConnect.js      # Database connection logic
│   ├── tempUrlSchema.js  # Mongoose schema for temporary URLs with TTL
│   ├── urlSchema.js      # Mongoose schema for URL pointers
│   └── userSchema.js     # Mongoose schema for users and their URLs
├── routes/
│   ├── addTempUrl.js     # Route handler for creating temporary URLs
│   ├── addUrl.js         # Route handler for creating permanent URLs
│   ├── deleteUrl.js      # Route handler for deleting a URL
│   ├── getUrl.js         # Route handler for redirecting short URLs
│   └── getUserData.js    # Route handler for fetching user data
├── utils/
│   └── nanoId.js         # Utility for generating short IDs
├── .env                  # Environment variables (not committed)
├── .env.example          # Example environment file
├── .gitignore
├── constants.js          # Application constants
├── index.js              # Main application entry point
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License.
