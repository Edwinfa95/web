import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../store/user/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

/**
 * Componente para gestionar los clientes.
 * 
 * Este componente permite visualizar una lista de clientes y añadir nuevos clientes.
 */
@Component({
  selector: 'app-clients',
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
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {

  // Lista de clientes obtenida del servicio.
  clients: any[] = [];

  // Formulario reactivo para añadir un nuevo cliente.
  clientForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    type_user: new FormControl('client', [Validators.required]),
  });

  /**
   * Constructor del componente.
   * 
   * @param _authService Servicio de autenticación para gestionar los clientes.
   */
  constructor(private _authService: AuthService) {
    this.loadData(); // Carga inicial de los clientes.
  }

  /**
   * Método para manejar el envío del formulario.
   * 
   * Valida el formulario y, si es válido, envía los datos para crear un nuevo cliente.
   * Luego recarga la lista de clientes.
   */
  onSubmit() {
    if (this.clientForm.valid) {
      this._authService.create(this.clientForm.value)
        .subscribe(({ success }: any) => {
          if (success) {
            this.loadData(); // Recarga la lista de clientes después de añadir uno nuevo.
          }
        });
    }
  }

  /**
   * Método para cargar la lista de clientes desde el servicio.
   * 
   * Actualiza la lista de clientes en el componente.
   */
  loadData() {
    this._authService.get('client').subscribe(({ clients, error }: any) => {
      if (error) {
        alert('Hubo un error al traer los clientes');
        console.log(error);
      } else {
        this.clients = clients; // Asigna la lista de clientes.
      }
    });
  }

  /**
   * Método para eliminar un cliente.
   * 
   * Muestra una confirmación antes de eliminar el cliente y recarga la lista después de la eliminación.
   * 
   * @param id Identificador del cliente a eliminar.
   */
  deleteItem(id: number) {
    if (confirm('¿Está seguro de eliminar el cliente?')) {
      this._authService.delete('client', id).subscribe(({ success }: any) => {
        this.loadData(); // Recarga la lista de clientes después de eliminar uno.
      });
    }
  }
}
