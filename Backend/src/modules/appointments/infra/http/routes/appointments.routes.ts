import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController';

const appointmentsRoute = Router();
const appointmentController = new AppointmentController();

appointmentsRoute.use(ensureAuthenticated);

/*
appointmentsRoute.get('/', async (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();

  return res.json(appointments);
});
*/

appointmentsRoute.post('/', appointmentController.create);

export default appointmentsRoute;
