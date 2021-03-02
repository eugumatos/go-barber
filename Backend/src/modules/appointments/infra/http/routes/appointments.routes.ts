import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentsService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRoute = Router();

appointmentsRoute.use(ensureAuthenticated);

/*
appointmentsRoute.get('/', async (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();

  return res.json(appointments);
});
*/

appointmentsRoute.post('/', async (req, res) => {
  const { provider_id, date } = req.body;

  const parseDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentService);

  const appointment = await createAppointment.execute({
    date: parseDate,
    provider_id,
  });
  return res.json(appointment);
});

export default appointmentsRoute;
