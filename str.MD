src/
├── config/
│ ├── index.ts // Configuration files (e.g., database connection)
│  
 ├── errors/
│ ├── appError.ts // Custom error classes
│ ├── handleCastError.ts // Error handling middleware for casting errors
│ ├── handleDuplicateError.ts // Error handling middleware for duplicate key errors
│ ├── handleNotFound.ts // Error handling middleware for not found errors
│ ├── handleValidation.ts // Error handling middleware for validation errors
│ ├── handleZodError.ts // Error handling middleware for Zod schema validation errors
│  
 ├── interfaces/
│ ├── error.ts // Interface for error handling
│ ├── index.d.ts // Global interfaces declaration
│  
 ├── middlewares/
│ ├── auth.ts // Authentication middleware
│ ├── globalErrorHandler.ts // Global error handling middleware
│ ├── isAdmin.ts // Middleware to check if user is admin
│ ├── notFound.ts // 404 handler middleware
│ ├── validation.ts // Request validation middleware
│  
 ├── modules/
│ ├── auth/
│ │ ├── auth.controller.ts // Controller handling authentication logic
│ │ ├── auth.interface.ts // Interfaces related to authentication
│ │ ├── auth.model.ts // Data models related to authentication
│ │ ├── auth.route.ts // Routes related to authentication
│ │ ├── auth.service.ts // Business logic related to authentication
│ │ ├── auth.utils.ts // Utility functions related to authentication
│ │ ├── auth.validation.ts // Request validation schemas for authentication
│ │  
 │ ├── booking/
│ │ ├── booking.controller.ts // Controller handling booking logic
│ │ ├── booking.interface.ts // Interfaces related to booking
│ │ ├── booking.model.ts // Data models related to booking
│ │ ├── booking.route.ts // Routes related to booking
│ │ ├── booking.service.ts // Business logic related to booking
│ │  
 │ ├── car/
│ │ ├── car.controller.ts // Controller handling car management logic
│ │ ├── car.interface.ts // Interfaces related to cars
│ │ ├── car.model.ts // Data models related to cars
│ │ ├── car.route.ts // Routes related to cars
│ │ ├── car.service.ts // Business logic related to cars
│ │ ├── car.validation.ts // Request validation schemas for cars
│ │  
 │ ├── user/
│ │ ├── user.constant.ts // Constants related to user module
│ │ ├── user.controller.ts // Controller handling user management logic
│ │ ├── user.interface.ts // Interfaces related to users
│ │ ├── user.model.ts // Data models related to users
│ │ ├── user.route.ts // Routes related to users
│ │ ├── user.service.ts // Business logic related to users
│ │ ├── user.validation.ts // Request validation schemas for users
│  
 ├── routes/
│ ├── index.ts // Centralized route registration
│  
 ├── utils/
│ ├── catchAsync.ts // Utility function to catch asynchronous errors
│ ├── getUserInfoFromToken.ts // Utility function to extract user information from JWT
│ ├── sendResponse.ts // Utility function to send HTTP responses
│  
 ├── app.ts // Express application setup
└── server.ts // Server initialization
