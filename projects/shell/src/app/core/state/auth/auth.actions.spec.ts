import * as AuthActions from './auth.actions';
import { User } from '../../../models/user.model';

describe('Auth Actions', () => {
  const testUsername = 'testUser';
  const testPassword = 'testPassword';
  const testUser: User = { id: 1, firstName: 'testUser', lastName: 'test', role: 'ADMIN', token: '27eubdjoeifjjsdnkcsjbjsdbckjbkvjibu' };
  const testError = 'Invalid credentials';

  it('should create a login action', () => {
    const action = AuthActions.login({ username: testUsername, password: testPassword });
    expect(action.type).toEqual('[Auth] Login');
    expect(action.username).toEqual(testUsername);
    expect(action.password).toEqual(testPassword);
  });

  it('should create a loginSuccess action', () => {
    const action = AuthActions.loginSuccess({ user: testUser });
    expect(action.type).toEqual('[Auth] Login Success');
    expect(action.user).toEqual(testUser);
  });

  it('should create a loginFailure action', () => {
    const action = AuthActions.loginFailure({ error: testError });
    expect(action.type).toEqual('[Auth] Login Failure');
    expect(action.error).toEqual(testError);
  });

  it('should create a logout action', () => {
    const action = AuthActions.logout();
    expect(action.type).toEqual('[Auth] Logout');
  });
});
