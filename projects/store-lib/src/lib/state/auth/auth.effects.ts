import { Inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from 'shared-services';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(action => {
        return this.authSVC.logIn({ username: action.username, password: action.password }).pipe(
              map(user => AuthActions.loginSuccess({ user })),
              catchError(error => of(AuthActions.loginFailure({ error })))
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    @Inject(AuthService) private authSVC: AuthService,
    ) {}
}
