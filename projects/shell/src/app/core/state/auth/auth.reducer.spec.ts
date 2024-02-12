import { authReducer, initialState } from './auth.reducer';
import * as AuthActions from './auth.actions';
import { User } from '../../../models/user.model';

describe('AuthReducer', () => {
  it('should return the initial state', () => {
    const action = {} as any;
    const state = authReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should handle login action', () => {
    const action = AuthActions.login({username: 'test', password: 'test'});
    const state = authReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should handle loginSuccess action', () => {
    const user: User = {
        firstName: 'test',
        lastName: 'name',
        id: 1,
        role: 'ADMIN',
        token: '2ehuowdjkewnkfjwuobkjdsnvkajvbkcjrvusgfji98ijl'
    };
    const action = AuthActions.loginSuccess({ user });
    const state = authReducer(initialState, action);

    expect(state).toEqual({ isLoggedIn: true, user });
  });

  it('should handle logout action', () => {
    const action = AuthActions.logout();
    const state = authReducer({ isLoggedIn: true, user: {
        firstName: 'test',
        lastName: 'name',
        id: 1,
        role: 'ADMIN',
        token: '2ehuowdjkewnkfjwuobkjdsnvkajvbkcjrvusgfji98ijl'
    } }, action);

    expect(state).toEqual(initialState);
  });
});
