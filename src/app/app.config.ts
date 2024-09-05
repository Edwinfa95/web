import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { appointmentReducer } from './store/appointment/reducers/appointment.reducer';
import { provideEffects } from '@ngrx/effects';
import { AppointmentEffects } from './store/appointment/effects/appointment.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authReducer } from './store/user/reducer/auth.reducer';
import { AuthEffects } from './store/user/effects/auth.effects';
import { tokenInterceptor } from './interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),
    provideStore({
      appointments: appointmentReducer,
      auth: authReducer
    }),
    provideEffects([AppointmentEffects, AuthEffects]),
    provideStoreDevtools(),
  ]
};
