import { Router } from 'express';
import ImageController from '../controllers/ImageController';
import AuthenticationMiddleware from '../middlewares/AuthenticationMiddleware';
const router = new Router();

router.post('/', AuthenticationMiddleware.authenticate, ImageController.store);

export default router;
