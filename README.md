# My Web Application

This web application is built using ReactJS for the frontend, ExpressJS for the backend, and MongoDB Atlas for the database. It offers a full-stack solution leveraging modern JavaScript frameworks and tools to deliver a seamless user experience.

## Features

- **User Authentication:** Secure login and registration using JWT.
- **CRUD Operations:** Create, Read, Update, and Delete functionality for various resources.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **API Integration:** Robust API built with ExpressJS to handle frontend requests and database operations.
- **Real-time Data:** Live updates and notifications using WebSockets.

## Technologies Used

### Frontend

- [ReactJS](https://reactjs.org/)
- [Redux](https://redux.js.org/) (for state management)
- [Axios](https://axios-http.com/) (for API calls)
- [Material-UI](https://material-ui.com/) (for styling)

### Backend

- [ExpressJS](https://expressjs.com/)
- [NodeJS](https://nodejs.org/)
- [JWT](https://jwt.io/) (for authentication)
- [Mongoose](https://mongoosejs.com/) (for MongoDB object modeling)

### Database

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud database service)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 14.x)
- [npm](https://www.npmjs.com/) (>= 6.x) or [yarn](https://yarnpkg.com/) (>= 1.x)
- [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
2. **Install backend dependencies**
   ```bash
   cd backend
   npm install

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
4. **Set up environment variables**

1. **Create a `.env` file in the backend directory and add the following:**

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_atlas_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

2. **Run the application:**

    - **Open two terminal windows or tabs, one for the backend and one for the frontend.**

    - **Backend:**
      ```bash
      cd backend
      npm start
      ```

    - **Frontend:**
      ```bash
      cd frontend
      npm start
      ```

    - The frontend will be served on `http://localhost:3000` and the backend on `http://localhost:5000`.

## Project Structure

```plaintext
.
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── config
│   └── server.js
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── redux
│   │   ├── utils
│   │   └── App.js
│   └── package.json
└── README.md
```



# Contact
Author: Your Name
Email: thuongcth03@gmail.com
GitHub: hoaithuong
Thank you for using our application! If you have any questions, feel free to reach out.


