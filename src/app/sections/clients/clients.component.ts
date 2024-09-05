import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../store/user/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

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
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {

  clients: any[] = [];

  clientForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    type_user: new FormControl('client', [Validators.required]),
  })

  constructor(private _authService: AuthService){
    this.loadData();
  }

  onSubmit(){
    if(this.clientForm.valid){
      this._authService.create(this.clientForm.value)
      .subscribe(({ success }:any) => {
        if(success){
          this.loadData();
        }
      })
    }
  }

  loadData(){
    this._authService.get('client').subscribe(({ clients, error }:any) => {
      if(error){
        alert('Hubo un error al traer los clientos');
        console.log(error);
      } else {
        this.clients = clients;
      }
    })
  }

  deleteItem(id:number){
    if(confirm('Esta seguro de eliminar el cliente?')){
      this._authService.delete('client',id).subscribe(({ success }:any) => {
        this.loadData();
      })
    }
  }

}
