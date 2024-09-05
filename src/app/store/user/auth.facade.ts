// state/auth.facade.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './actions/auth.actions';
import * as AuthSelectors from './selector/auth.selectors';
import { Observable } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthFacade {
    
    user$: Observable<User | null> = this.store.select(AuthSelectors.selectUser);
    loading$: Observable<boolean> = this.store.select(AuthSelectors.selectAuthLoading);
    error$: Observable<string | null> = this.store.select(AuthSelectors.selectAuthError);

    constructor(private store: Store) { }

    login(email: string, password: string) {
        this.store.dispatch(AuthActions.login({ email, password }));
    }

    logout() {
        this.store.dispatch(AuthActions.logout());
    }
}
