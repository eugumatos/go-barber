import { Router } from 'express';

import SessionsController from '../controllers/SessionsControllers';

const sessionsRouter = Router();
const sessionControllers = new SessionsController();

sessionsRouter.post('/', sessionControllers.create);

export default sessionsRouter;
