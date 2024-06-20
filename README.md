# Assignment3-L2B3

## Car Rental Reservation System Server

## Introduction

Welcome to the backend of our Car Rental Reservation System! This system manages the essential functions for a car rental service, including creating, reading, updating, and deleting (CRUD) operations for cars and bookings. It also handles user authentication and authorization to ensure secure access to the system.

## Technologies Used

Node.js
Express.js
TypeScript
MongoDB
Mongoose
JWT
Zod
Bcrypt

## Features

- **User Management**:V

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

## API Endpoints

### Authentication

#### Sign Up

- **Endpoint:** `/api/auth/signup`
- **Method:** `POST`

#### Sign In

- **Endpoint:** `/api/auth/signin`
- **Method:** `POST`

### Car Management

#### Create a Car (Only accessible to the Admin)

- **Endpoint:** `/api/cars`
- **Method:** `POST`

#### Get All Cars

- **Endpoint:** `/api/cars`
- **Method:** `GET`

#### Get A Car

- **Endpoint:** `/api/cars/:id`
- **Method:** `GET`

#### Update A Car (Only Accessible to the Admin)

- **Endpoint:** `/api/cars/:id`
- **Method:** `PUT`

#### Delete A Car (Only Accessible to the Admin)

- **Endpoint:** `/api/cars/:id`
- **Method:** `DELETE` (Soft Delete)

### Booking Management

#### Get All Bookings (Accessible to the Admin)

- **Endpoint:** `/api/bookings`
- **Method:** `GET`
- **Query Parameters:**
  - `carId`: ID of the car for which availability needs to be checked.
  - `date`: The specific date for which availability needs to be checked (format: YYYY-MM-DD).

#### Book a Car (Only Accessible to the User)

- **Endpoint:** `/api/bookings`
- **Method:** `POST`

#### Get User's Bookings (Only Accessible to the User)

- **Endpoint:** `/api/bookings/my-bookings`
- **Method:** `GET`

#### Return The Car (Only Accessible to Admin)

- **Endpoint:** `/api/cars/return`
- **Method:** `PUT`

## Live Demo

Check out the live demo of the Car Rental API on Vercel: [Vercel Live Link](https://assignment3-phi-fawn.vercel.app/)

## GitHub Repository

Explore the source code and contribute to the project on GitHub: [GitHub Repository Link](https://github.com/mahfuzctg/Assignment3-L2B3)

## Conclusion

I hope this Car Rental Server helps you efficiently manage your car rental services. If you have any questions, suggestions, or contributions, feel free to explore the [GitHub repository](https://github.com/mahfuzctg/Assignment3-L2B3) and submit an issue or pull request. Your feedback is valuable and helps me improve the project. Thank you for using my Car Rental Server!
