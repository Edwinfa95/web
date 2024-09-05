import { createAction, props } from '@ngrx/store';
import { Appointment } from '../models/appointment.model';

// Acciones para cargar citas
export const loadAppointments = createAction('[Appointment] Load Appointments');
export const loadAppointmentsSuccess = createAction(
    '[Appointment] Load Appointments Success',
    props<{ appointments: Appointment[] }>()
);
export const loadAppointmentsFailure = createAction(
    '[Appointment] Load Appointments Failure',
    props<{ error: string }>()
);

// Acciones para agregar una nueva cita
export const addAppointment = createAction(
    '[Appointment] Add Appointment',
    props<{ appointment: Appointment }>()
);
export const addAppointmentSuccess = createAction(
    '[Appointment] Add Appointment Success',
    props<{ appointment: Appointment }>()
);
export const addAppointmentFailure = createAction(
    '[Appointment] Add Appointment Failure',
    props<{ error: string }>()
);
