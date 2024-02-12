import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { AuthEffects } from './auth.effects';
import * as AuthActions from './auth.actions';
import { AuthService } from 'shared-services';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['logIn']);

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    effects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should dispatch loginSuccess action on successful login', () => {
    const username = 'testUser';
    const password = 'testPassword';
    const user = {
        firstName: 'test',
        lastName: 'name',
        id: 1,
        role: 'ADMIN',
        token: '2ehuowdjkewnkfjwuobkjdsnvkajvbkcjrvusgfji98ijl'
    };

    const action = AuthActions.login({ username, password });
    const completion = AuthActions.loginSuccess({ user });

    actions$ = hot('-a', { a: action });
    const response = cold('-b', { b: user });
    authService.logIn.and.returnValue(response);

    const expected = cold('--c', { c: completion });
    expect(effects.login$).toBeObservable(expected);
  });

  it('should dispatch loginFailure action on failed login', () => {
    const username = 'testUser';
    const password = 'testPassword';
    const error = 'Invalid credentials';

    const action = AuthActions.login({ username, password });
    const completion = AuthActions.loginFailure({ error });

    actions$ = hot('-a', { a: action });
    const response = cold('-#', {}, error);
    authService.logIn.and.returnValue(response);

    const expected = cold('--c', { c: completion });
    expect(effects.login$).toBeObservable(expected);
  });
});
