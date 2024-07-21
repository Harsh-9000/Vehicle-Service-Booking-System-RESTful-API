# Vehicle Service Booking System
This is a RESTful API for a vehicle service booking system. It allows users to create, update, delete, and retrieve booking information.

## Features
- User authentication using JWT
- CRUD operations for service bookings
- Filtering bookings by date and vehicle type
- Rate limiting to prevent API abuse
- Dockerized for easy deployment

## Prerequisites
- Node.js
- MongoDB
- Docker

## Setup Instructions
1. Clone the repository:
```sh
git clone https://github.com/yourusername/vehicle-service-booking.git
cd vehicle-service-booking
```
2. Install dependencies:
```sh
npm install
```
3. Set up environment variables:
Create a `.env` file in the root directory with the following contents:
```sh
# Port Variables
PORT=

# MongoDB Variables
MONGODB_CONNECTION_STRING=

# JWT Variables
JWT_SECRET_KEY=
```
4. Start MongoDB:
Ensure your MongoDB server is running.

5. Run the application:
```sh
npm start
```

The API should now be running on `http://localhost:3000` or whichever `PORT` number you used in `.env` file.

## API Endpoints
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login and receive JWT token
- POST /api/auth/logout - Logout
- GET /api/bookings - List all bookings (with optional date and vehicleType filters)
- POST /api/bookings - Create a new booking
- GET /api/bookings/:id - Get a specific booking
- PUT /api/bookings/:id - Update a booking
- DELETE /api/bookings/:id - Delete a booking

## API Documentation
This project uses Swagger for API documentation. After starting the server, you can access the interactive API documentation at:
```sh
http://localhost:3000/api-docs
```
This documentation provides detailed information about each endpoint, including:

- Required parameters
- Request body schemas
- Response formats
- Authentication requirements

You can also test the API directly from the Swagger UI.

## Testing
You can use tools like Postman to test the API endpoints.
