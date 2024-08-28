import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CarController } from './car.controller';
import { CarValidations } from './car.validation';

import { auth } from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';

const router = Router();

router.post(
  '/',
  auth(USER_ROLES.admin),
  validateRequest(CarValidations.createCarValidationSchema),
  CarController.createCar,
);

router.get('/', CarController.getAllCar);

router.get('/:id', CarController.getSingleCar);
router.put(
  '/return',
  auth(USER_ROLES.admin),
  validateRequest(CarValidations.returnCarValidationSchema),
  CarController.returnCar,
);

router.put(
  '/:id',
  auth(USER_ROLES.admin),
  validateRequest(CarValidations.updateCarValidationSchema),
  CarController.updateCar,
);

router.delete('/:id', auth(USER_ROLES.admin), CarController.deleteCar);

export const CarRoutes = router;
