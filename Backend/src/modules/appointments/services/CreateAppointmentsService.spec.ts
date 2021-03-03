import AppError from '@shared/errors/AppError';

import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppoitmentService from './CreateAppointmentsService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppoitmentService(
      fakeAppointmentRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '12345',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12345');
  });

  it('should be able to create a two appointments on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppoitmentService(
      fakeAppointmentRepository,
    );

    const appointmentDate = new Date(2021, 3, 2, 23);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '12345',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
