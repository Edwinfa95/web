import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../store/user/services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Componente para gestionar los barberos.
 * 
 * Este componente permite visualizar una lista de barberos y añadir nuevos barberos.
 */
@Component({
  selector: 'app-barbers',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './barbers.component.html',
  styleUrls: ['./barbers.component.scss']
})
export class BarbersComponent {

  // Lista de barberos obtenida del servicio.
  barbers: any[] = [];

  // Formulario reactivo para añadir un nuevo barbero.
  barberForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    type_user: new FormControl('barber', [Validators.required]),
  })

  /**
   * Constructor del componente.
   * 
   * @param _authService Servicio de autenticación para gestionar los barberos.
   */
  constructor(private _authService: AuthService) {
    this.loadData(); // Carga inicial de los barberos.
  }

  /**
   * Método para manejar el envío del formulario.
   * 
   * Valida el formulario y, si es válido, envía los datos para crear un nuevo barbero.
   * Luego recarga la lista de barberos.
   */
  onSubmit() {
    if (this.barberForm.valid) {
      this._authService.create(this.barberForm.value)
        .subscribe(({ success }: any) => {
          if (success) {
            this.loadData(); // Recarga la lista de barberos después de añadir uno nuevo.
          }
        });
    }
  }

  /**
   * Método para cargar la lista de barberos desde el servicio.
   * 
   * Actualiza la lista de barberos en el componente.
   */
  loadData() {
    this._authService.get('barber').subscribe(({ barbers, error }: any) => {
      if (error) {
        alert('Hubo un error al traer los barberos');
        console.log(error);
      } else {
        this.barbers = barbers; // Asigna la lista de barberos.
      }
    });
  }

  /**
   * Método para eliminar un barbero.
   * 
   * Muestra una confirmación antes de eliminar el barbero y recarga la lista después de la eliminación.
   * 
   * @param id Identificador del barbero a eliminar.
   */
  deleteItem(id: number) {
    if (confirm('Está seguro de eliminar el barbero?')) {
      this._authService.delete('barber', id).subscribe(({ success }: any) => {
        this.loadData(); // Recarga la lista de barberos después de eliminar uno.
      });
    }
  }
}
