// state/auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import * as AuthActions from '../actions/auth.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService
    ) { }

    // Efecto para manejar el login
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            mergeMap(({ email, password }) =>
                this.authService.login(email, password).pipe(
                    map((user:any) => {
                        localStorage.setItem('token', user.access_token);
                        location.reload();
                        return AuthActions.loginSuccess({ user })
                    }),
                    catchError(({ status, message }) => {
                        let error = message;
                        if(status == 401){
                            error = 'Usuario o contraseña incorrecto';
                        }
                        return of(AuthActions.loginFailure({ error }))
                    })
                )
            )
        )
    );
}
