// state/auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { User } from '../models/user.model';

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

export const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.login, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(AuthActions.loginSuccess, (state, { user }) => ({
        ...state,
        user,
        loading: false,
        error: null
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
        ...state,
        user: null,
        loading: false,
        error
    })),
    on(AuthActions.logout, (state) => ({
        ...state,
        user: null
    }))
);
