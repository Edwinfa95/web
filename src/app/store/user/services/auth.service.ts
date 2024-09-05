// services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = environment.api + '/api';

    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/login`, { email, password });
    }

    create(data:any){
        return this.http.post(`${this.apiUrl}/barber`, data);
    }

    get(type:string = 'user'){
        return this.http.get(`${this.apiUrl}/${type}`);
    }

    delete(type:string, id:number){
        return this.http.delete(`${this.apiUrl}/${type}/${id}`);
    }
}
