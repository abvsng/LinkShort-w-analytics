# Link Shortener Frontend

This is the frontend for a link shortener application with user authentication. It allows users to shorten long URLs and track their usage.

## Features

*   **Temporary Link Shortening:** Quickly shorten a URL without creating an account. These links expire after 2 days.
*   **Permanent Link Shortening:** Create an account to generate permanent short links.
*   **User Authentication:** Secure user authentication using Auth0.
*   **User Dashboard:** View and manage your shortened links.
*   **Protected Routes:** Ensures that only authenticated users can access the user dashboard.
*   **404 Page:** A custom 404 page with a Lottie animation.

## Tech Stack

*   **Framework:** React
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **State Management:** Redux Toolkit
*   **Routing:** React Router
*   **Authentication:** Auth0
*   **Animations:** Lottie, Framer Motion

## Getting Started

To get the application up and running locally, you'll need to set up both the frontend and the backend.

### Backend Setup

1.  Navigate to the `Backend` directory.
2.  Install the dependencies: `npm install`
3.  Create a `.env` file and add your MongoDB connection string:
    ```
    DB_URI=your_mongodb_connection_string
    ```
4.  Start the backend server: `npm start`

The backend will be running at `http://localhost:3000`.

### Frontend Setup

1.  Navigate to the `temp-front` directory.
2.  Install the dependencies: `npm install`
3.  Start the frontend development server: `npm run dev`

The frontend will be running at `http://localhost:5173`.

## Available Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the application for production.
*   `npm run lint`: Lints the code.
*   `npm run preview`: Previews the production build.

## Project Structure

```
temp-front/
├── src/
│   ├── Components/
│   │   └── ProtectedRoute.jsx    # Protects routes from unauthenticated users
│   ├── Pages/
│   │   ├── AppLayout.jsx         # Main layout with header and navigation
│   │   ├── ErrorPage.jsx         # 404 error page
│   │   ├── HomePage.jsx          # Page for temporary link shortening
│   │   └── UserPage.jsx          # Page for permanent link shortening
│   ├── Store/
│   │   ├── store.jsx             # Redux store configuration
│   │   └── Slices/
│   │       └── counterSlice.jsx  # Example Redux slice
│   ├── App.jsx                 # Main application component with routing
│   └── main.jsx                # Entry point of the application
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Dependencies

*   `@auth0/auth0-react`: ^2.6.0
*   `@reduxjs/toolkit`: ^2.9.0
*   `@tailwindcss/vite`: ^4.1.14
*   `lottie-react`: ^2.4.1
*   `lucide-react`: ^0.545.0
*   `motion`: ^12.23.24
*   `react`: ^19.1.1
*   `react-dom`: ^19.1.1
*   `react-redux`: ^9.2.0
*   `react-router-dom`: ^7.9.4
*   `tailwindcss`: ^4.1.14

## DevDependencies

*   `@eslint/js`: ^9.36.0
*   `@types/react`: ^19.1.16
*   `@types/react-dom`: ^19.1.9
*   `@vitejs/plugin-react`: ^5.0.4
*   `eslint`: ^9.36.0
*   `eslint-plugin-react-hooks`: ^5.2.0
*   `eslint-plugin-react-refresh`: ^0.4.22
*   `globals`: ^16.4.0
*   `vite`: ^7.1.7