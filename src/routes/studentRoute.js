import { Router } from 'express';
import StudentController from '../controllers/StudentController';

import AuthenticationMiddleware from '../middlewares/AuthenticationMiddleware';

const router = new Router();

router.get('/', StudentController.index);
router.get('/:id', StudentController.show);
router.post('/', AuthenticationMiddleware.authenticate, StudentController.store);
router.put('/:id', AuthenticationMiddleware.authenticate, StudentController.update);
router.delete('/:id', AuthenticationMiddleware.authenticate, StudentController.delete);

export default router;
