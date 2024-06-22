# Assignment3-L2B3

## Car Rental API

The Car Rental API is a RESTful web service designed to facilitate car rental management. It provides endpoints for users to register, login, book cars, manage bookings, and return cars. Built with Node.js, Express.js, MongoDB, and JWT authentication, it ensures secure and efficient handling of car rental operations.

## Features

- **User Management**:

  - User registration and authentication (JWT).
  - Role-based access control (admin, user).

- **Car Management**:

  - CRUD operations for cars.
  - Retrieve car details, including availability and features.

- **Booking Management**:

  - Book a car for a specific date and time.
  - Retrieve user-specific bookings.
  - Return a booked car.

- **Security**:

  - Passwords are hashed using bcrypt before storage.
  - JWT tokens for secure authentication and authorization.

- **Error Handling**:
  - Centralized error handling for consistent responses.
  - Proper HTTP status codes for different scenarios.
