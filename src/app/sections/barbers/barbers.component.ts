import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../store/user/services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  styleUrl: './barbers.component.scss'
})
export class BarbersComponent {

  barbers: any[] = [];

  barberForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    type_user: new FormControl('barber', [Validators.required]),
  })

  constructor(private _authService: AuthService){
    this.loadData();
  }

  onSubmit(){
    if(this.barberForm.valid){
      this._authService.create(this.barberForm.value)
      .subscribe(({ success }:any) => {
        if(success){
          this.loadData();
        }
      })
    }
  }

  loadData(){
    this._authService.get('barber').subscribe(({ barbers, error }:any) => {
      if(error){
        alert('Hubo un error al traer los barberos');
        console.log(error);
      } else {
        this.barbers = barbers;
      }
    })
  }

  deleteItem(id:number){
    if(confirm('Esta seguro de eliminar el barbero?')){
      this._authService.delete('barber',id).subscribe(({ success }:any) => {
        this.loadData();
      })
    }
  }

}
