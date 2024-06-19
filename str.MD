src/
├── config/
│ └── index.ts
├── errors/
│ ├── appError.ts
│ ├── handleCastError.ts
│ ├── handleDuplicateError.ts
│ ├── handleNotFound.ts
│ ├── handleValidation.ts
│ └── handleZodError.ts
├── interfaces/
│ ├── error.ts
│ └── index.d.ts
├── middlewares/
│ ├── auth.ts
│ ├── globalErrorHandler.ts
│ ├── isAdmin.ts
│ ├── notFound.ts
│ └── validation.ts
├── modules/
│ ├── auth/
│ │ ├── auth.controller.ts
│ │ ├── auth.interface.ts
│ │ ├── auth.model.ts
│ │ ├── auth.route.ts
│ │ ├── auth.service.ts
│ │ ├── auth.utils.ts
│ │ └── auth.validation.ts
│ ├── booking/
│ │ ├── booking.controller.ts
│ │ ├── booking.interface.ts
│ │ ├── booking.model.ts
│ │ ├── booking.route.ts
│ │ └── booking.service.ts
│ ├── car/
│ │ ├── car.controller.ts
│ │ ├── car.interface.ts
│ │ ├── car.model.ts
│ │ ├── car.route.ts
│ │ ├── car.service.ts
│ │ └── car.validation.ts
│ └── user/
│ ├── user.constant.ts
│ ├── user.controller.ts
│ ├── user.interface.ts
│ ├── user.model.ts
│ ├── user.route.ts
│ ├── user.service.ts
│ └── user.validation.ts
├── routes/
│ └── index.ts
├── utils/
│ ├── catchAsync.ts
│ ├── getUserInfoFromToken.ts
│ └── sendResponse.ts
├── app.ts
└── server.ts
