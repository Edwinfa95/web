import { Appointment } from '../models/appointment.model';

export interface AppointmentState {
    appointments: Appointment[];
    loading: boolean;
    error: string | null;
}

export const initialState: AppointmentState = {
    appointments: [],
    loading: false,
    error: null,
};
