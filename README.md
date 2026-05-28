# ParkEaseNHCK

ParkEaseNHCK is a MERN stack parking management project for New Horizon College Kasturinagar. It allows students to register, login, view parking slots on a map, book or cancel a slot, and check booking history.

## Tech Stack

- MongoDB
- Express.js
- React.js
- Node.js
- Tailwind CSS
- Leaflet Map

## Features

- Student registration and login
- JWT based protected routes
- Parking slot map
- Book and unbook parking slots
- Booking history search by registration number
- User NHCK profile card on the home page

## Project Structure

```text
ParkEaseNHCK/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    app.js
    server.js
    seed.js
  frontend/
    src/
      components/
      pages/
      services/
```

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend:

```bash
npm run dev
```

Seed parking slots:

```bash
node seed.js
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## Main Pages

- Home page with parking status and user profile
- Login page
- Register page
- Map page
- History page

## About

This project was created as a student MERN stack project to demonstrate full-stack development, authentication, database usage, API integration, and interactive map-based UI.
