import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AppointmentService } from '../services/appointment.service';
import * as AppointmentActions from '../actions/appointment.actions';

@Injectable()
export class AppointmentEffects {
    constructor(
        private actions$: Actions,
        private appointmentService: AppointmentService
    ) { }

    loadAppointments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppointmentActions.loadAppointments),
            mergeMap(() =>
                this.appointmentService.getAppointments().pipe(
                    map((appointments) =>
                        AppointmentActions.loadAppointmentsSuccess({ appointments })
                    ),
                    catchError((error) =>
                        of(AppointmentActions.loadAppointmentsFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    addAppointment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppointmentActions.addAppointment),
            mergeMap((action) =>
                this.appointmentService.addAppointment(action.appointment).pipe(
                    map((appointment) =>
                        AppointmentActions.addAppointmentSuccess({ appointment })
                    ),
                    catchError((error) =>
                        of(AppointmentActions.addAppointmentFailure({ error: error.message }))
                    )
                )
            )
        )
    );
}
