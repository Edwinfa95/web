import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppointmentState } from '../state/appointment.state';

// Selecciona el estado de 'appointments'
export const selectAppointmentState = createFeatureSelector<AppointmentState>('appointments');

// Selector para obtener todas las citas
export const selectAllAppointments = createSelector(
    selectAppointmentState,
    (state: AppointmentState) => state.appointments
);

// Selector para obtener el estado de carga
export const selectLoading = createSelector(
    selectAppointmentState,
    (state: AppointmentState) => state.loading
);

// Selector para obtener el error
export const selectError = createSelector(
    selectAppointmentState,
    (state: AppointmentState) => state.error
);
