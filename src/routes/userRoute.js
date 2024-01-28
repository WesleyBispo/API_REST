import { Router } from 'express';
import userController from '../controllers/UserController';
import AuthenticationMiddleware from '../middlewares/AuthenticationMiddleware';
const router = new Router();

router.get('/', userController.index); // Lista users
router.get('/:id', userController.show); // Lista user

router.post('/', userController.store);
router.put('/', AuthenticationMiddleware.authenticate, userController.update);
router.delete('/', AuthenticationMiddleware.authenticate, userController.delete);

export default router;
