# News App with Commenting Feature

This application provides users with access to the latest news articles fetched from the News API. Users can view news articles and leave comments on them.

## Features

- User authentication with JWT
- Retrieval of latest news articles from News API
- Display of news articles with comment counts
- Commenting feature allowing users to leave comments on news articles
- User-friendly interface with React components

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)

### Frontend

- React.js
- React Router Dom
- CSS

## How to Launch the Application locally

### Backend
1. Navigate to the backend directory:
```
cd backend
```
2. Install dependencies:
```
npm install
```
3. Set up a MongoDB database and create a `.env` file in the root directory with the following content:
```
DB_USER = <your-mongodb-username>
DB_PASSWORD = <your-mongodb-password>
NEWS_API_KEY = <your-news-api-key>
```

4. Start the server:
```
node app.js
```

### Frontend

1. Navigate to the frontend directory:
```
cd frontend
```
2. Install dependencies:
```
npm install
```
3. Start the application:
```
npm run dev
```