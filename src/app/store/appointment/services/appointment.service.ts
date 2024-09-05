import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class AppointmentService {
    private apiUrl = environment.api + '/api/appointments';

    constructor(private http: HttpClient) { }

    getAppointments(): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(this.apiUrl);
    }

    addAppointment(appointment: Appointment): Observable<Appointment> {
        return this.http.post<Appointment>(this.apiUrl, appointment);
    }
}
