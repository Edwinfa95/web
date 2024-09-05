// state/auth.actions.ts
import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

// Acción para iniciar el proceso de login
export const login = createAction(
    '[Auth] Login',
    props<{ email: string; password: string }>()
);

// Acción para el éxito del login
export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ user: User }>()
);

// Acción para el fallo del login
export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: string }>()
);

// Acción para realizar logout
export const logout = createAction('[Auth] Logout');
