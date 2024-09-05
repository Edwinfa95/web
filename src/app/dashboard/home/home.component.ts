import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTabsModule } from '@angular/material/tabs'
import { ClientsComponent } from '../../sections/clients/clients.component';
import { BarbersComponent } from '../../sections/barbers/barbers.component';
import { AppointmentsComponent } from '../../sections/appointments/appointments.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatTabsModule,
    ClientsComponent,
    BarbersComponent,
    AppointmentsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
