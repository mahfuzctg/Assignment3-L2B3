import { Router } from 'express';

import { auth } from '../../middlewares/auth';
import { USER_ROLES } from './user.constant';
import { UserController } from './user.controller';

const router = Router();

router.get('/', auth(USER_ROLES.admin), UserController.getAllUser);
router.patch('/:id', auth(USER_ROLES.admin), UserController.updateUserRole);
router.delete('/:id', auth(USER_ROLES.admin), UserController.deleteUser);

export const UserRoutes = router;
