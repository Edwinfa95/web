import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppointmentsFacade } from '../../store/appointment/appointments.facade';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../store/user/services/auth.service';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent {

  appointmentForm = new FormGroup({
    user_id: new FormControl('', [Validators.required]),
    barber_id: new FormControl('', [Validators.required]),
    service_id: new FormControl('', [Validators.required]),
    appointment_date: new FormControl('', [Validators.required]),
  });

  clients: any[] = [];
  barbers: any[] = [];
  services: any[] = [];

  constructor(
    public _appointmentsFacade: AppointmentsFacade,
    private _auth: AuthService
  ) {
    this._appointmentsFacade.loadAppointments();
    this.loadData();
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const { user_id, barber_id, service_id, appointment_date } = this.appointmentForm.value;
      this._appointmentsFacade.addAppointment({ user_id, barber_id, service_id, appointment_date });
      setTimeout(() => {
        this._appointmentsFacade.loadAppointments();
      }, 2000);
    }
  }

  loadData() {
    combineLatest([
      this._auth.get('barber'),
      this._auth.get('client'),
      this._auth.get('services')
    ]).pipe(
      map(([b, c, services]: any) => ({ barbers: b.barbers, clients: c.clients, services }))
    ).subscribe(({ barbers, clients, services }) => {
      this.barbers = barbers;
      this.clients = clients;
      this.services = services;
    });
  }
}
