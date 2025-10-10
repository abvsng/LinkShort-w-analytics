# Node.js URL Shortener

A simple and efficient URL shortener service built with Node.js, Express, and MongoDB. This application provides a RESTful API to create and manage shortened URLs.

## Features

-   **Shorten URLs:** Convert long, cumbersome URLs into short, easy-to-share tiny URLs.
-   **Fast Redirects:** Quickly redirects short URLs to their original destination.
-   **User-specific Links:** Associates shortened URLs with a user ID, allowing for user-based link management.
-   **AI-Powered Categorization (Optional):** Automatically categorizes URLs using a lightweight, built-in AI classifier.

## Tech Stack

-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB with Mongoose
-   **Dependencies:**
    -   `cors` for handling Cross-Origin Resource Sharing
    -   `dotenv` for managing environment variables
    -   `nanoid` for generating unique, short URL IDs

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:

-   [Node.js](https://nodejs.org/) (v14 or later)
-   [npm](https://www.npmjs.com/)
-   [MongoDB](https://www.mongodb.com/try/download/community) (or a cloud-hosted MongoDB instance)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Configure environment variables:**
    Create a `.env` file in the root of the project by copying the example file:
    ```sh
    cp .env.example .env
    ```
    Open the `.env` file and add your MongoDB connection string:
    ```
    MONGO_URI=your_mongodb_connection_string
    ```

### Running the Application

To start the server, run the following command:

```sh
npm start
```

The server will start on `http://localhost:3000`.

## API Endpoints

The following are the available API endpoints for the service.

### Shorten a URL

-   **Endpoint:** `POST /api/shorten`
-   **Description:** Creates a new short URL.
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
      "message": "URL added to DB",
      "tinyUrl": "generated-tiny-url"
    }
    ```

### Redirect to Original URL

-   **Endpoint:** `GET /api/:tinyUrl`
-   **Description:** Redirects to the original long URL corresponding to the provided `tinyUrl`.
-   **URL Parameter:**
    -   `tinyUrl` (string, required): The short ID of the URL.
-   **Action:** 302 Redirect to the original URL.

## Project Structure

```
.
├── db/
│   ├── dbConnect.js      # Database connection logic
│   ├── urlSchema.js      # Mongoose schema for URL pointers
│   └── userSchema.js     # Mongoose schema for users and their URLs
├── routes/
│   ├── addUrl.js         # Route handler for creating short URLs
│   └── getUrl.js         # Route handler for redirecting short URLs
├── utils/
│   └── nanoId.js         # Utility for generating short IDs
├── .env                  # Environment variables (not committed)
├── .env.example          # Example environment file
├── .gitignore
├── constants.js
├── index.js              # Main application entry point
├── package.json
└── README.md
```

