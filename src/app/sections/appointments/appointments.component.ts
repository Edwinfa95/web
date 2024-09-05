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

/**
 * Componente para gestionar las citas.
 * 
 * Este componente permite visualizar una lista de citas y añadir nuevas citas.
 */
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
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent {

  // Formulario reactivo para la gestión de citas.
  appointmentForm = new FormGroup({
    user_id: new FormControl('', [Validators.required]),
    barber_id: new FormControl('', [Validators.required]),
    service_id: new FormControl('', [Validators.required]),
    appointment_date: new FormControl('', [Validators.required]),
  });

  // Listas para los clientes, barberos y servicios disponibles.
  clients: any[] = [];
  barbers: any[] = [];
  services: any[] = [];

  constructor(
    public _appointmentsFacade: AppointmentsFacade, // Facade para la gestión de citas.
    private _auth: AuthService // Servicio de autenticación para obtener datos adicionales.
  ) {
    this._appointmentsFacade.loadAppointments(); // Carga inicial de citas.
    this.loadData(); // Carga de datos de clientes, barberos y servicios.
  }

  /**
   * Método que maneja el envío del formulario.
   * 
   * Valida el formulario y, si es válido, añade una nueva cita y recarga la lista de citas.
   */
  onSubmit() {
    if (this.appointmentForm.valid) {
      const { user_id, barber_id, service_id, appointment_date } = this.appointmentForm.value;
      this._appointmentsFacade.addAppointment({ user_id, barber_id, service_id, appointment_date });
      setTimeout(() => {
        this._appointmentsFacade.loadAppointments(); // Recarga la lista de citas después de añadir una nueva.
      }, 2000);
    }
  }

  /**
   * Método para cargar datos de barberos, clientes y servicios.
   * 
   * Combina las solicitudes de datos y actualiza las listas correspondientes.
   */
  loadData() {
    combineLatest([
      this._auth.get('barber'),
      this._auth.get('client'),
      this._auth.get('services')
    ]).pipe(
      map(([b, c, services]: any) => ({ barbers: b.barbers, clients: c.clients, services }))
    ).subscribe(({ barbers, clients, services }) => {
      this.barbers = barbers; // Asigna la lista de barberos.
      this.clients = clients; // Asigna la lista de clientes.
      this.services = services; // Asigna la lista de servicios.
    });
  }
}
