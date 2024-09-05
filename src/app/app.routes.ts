import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        canMatch: [AuthGuard],
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: '', 
        loadComponent: () => import('./dashboard/home/home.component').then(m => m.HomeComponent)
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
