# BookRush - Google Books API Search Engine

BookRush is a MERN stack web app that lets users search for books via the Google Books API, save favorites, and manage their collection. It uses GraphQL with Apollo Server and is deployed on Render.

## Features
- Search books via Google Books API
- User authentication with JWT
- Save and manage favorite books

## Technologies
- **Front End**: React, Vite, Apollo Client
- **Back End**: Node.js, Express, Apollo Server, MongoDB
- **Database**: MongoDB Atlas
- **Deployment**: Render

## Installation

### Prerequisites
- Node.js, npm/yarn, MongoDB Atlas account

### Steps
1. **Clone the Repository**
    ```bash
    git clone https://github.com/Vation7/BookRush.git
    cd BookRush/Develop
    ```
## File Structure
```bash
├── Develop
│   ├── client
│   │   ├── dist
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── public
│   │   │   └── vite.svg
│   │   ├── src
│   │   │   ├── App.css
│   │   │   ├── App.jsx
│   │   │   ├── assets
│   │   │   │   └── react.svg
│   │   │   ├── components
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── SignupForm.jsx
│   │   │   ├── main.jsx
│   │   │   ├── pages
│   │   │   │   ├── SavedBooks.jsx
│   │   │   │   └── SearchBooks.jsx
│   │   │   └── utils
│   │   │       ├── API.js
│   │   │       ├── auth.jsx
│   │   │       ├── localStorage.js
│   │   │       ├── mutations.js
│   │   │       └── queries.js
│   │   └── vite.config.js
│   ├── package.json
│   └── server
│       ├── config
│       │   └── connection.js
│       ├── controllers
│       │   └── user-controller.js
│       ├── models
│       │   ├── Book.js
│       │   ├── User.js
│       │   └── index.js
│       ├── package.json
│       ├── routes
│       │   ├── api
│       │   │   ├── index.js
│       │   │   └── user-routes.js
│       │   └── index.js
│       ├── schemas
│       │   ├── index.js
│       │   ├── resolvers.js
│       │   └── typeDefs.js
│       ├── server.js
│       └── utils
│           └── auth.js
```
## License
This project is licensed under the MIT License.
