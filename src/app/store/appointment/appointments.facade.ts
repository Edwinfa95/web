import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AppointmentActions from './actions/appointment.actions';
import * as AppointmentSelectors from './selectors/appointment.selectors';
import { Observable } from 'rxjs';
import { Appointment } from './models/appointment.model';

@Injectable({
    providedIn: 'root',
})
export class AppointmentsFacade {
    
    // Observables para selectores
    appointments$: Observable<Appointment[]> = this.store.select(AppointmentSelectors.selectAllAppointments);
    loading$: Observable<boolean> = this.store.select(AppointmentSelectors.selectLoading);
    error$: Observable<string | null> = this.store.select(AppointmentSelectors.selectError);

    constructor(private store: Store) { }

    // Método para cargar citas
    loadAppointments() {
        this.store.dispatch(AppointmentActions.loadAppointments());
    }

    // Método para agregar una cita
    addAppointment(appointment: any) {
        this.store.dispatch(AppointmentActions.addAppointment({ appointment }));
    }
}
