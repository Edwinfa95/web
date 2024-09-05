import { createReducer, on } from '@ngrx/store';
import * as AppointmentActions from '../actions/appointment.actions';
import { AppointmentState, initialState } from '../state/appointment.state';

export const appointmentReducer = createReducer(
    initialState,
    on(AppointmentActions.loadAppointments, (state) => ({ ...state, loading: true })),
    on(AppointmentActions.loadAppointmentsSuccess, (state, { appointments }) => ({
        ...state,
        loading: false,
        appointments,
        error: null,
    })),
    on(AppointmentActions.loadAppointmentsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(AppointmentActions.addAppointment, (state) => ({ ...state, loading: true })),
    on(AppointmentActions.addAppointmentSuccess, (state, { appointment }) => ({
        ...state,
        loading: false,
        appointments: [...state.appointments, appointment],
        error: null,
    })),
    on(AppointmentActions.addAppointmentFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);
