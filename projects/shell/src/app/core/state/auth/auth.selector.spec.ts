import { TestBed } from '@angular/core/testing';
import { Store, StoreModule, selectAuthUser, selectAuthState, authReducer, AuthState, isLoggedIn } from 'store-lib';

describe('Auth Selectors', () => {
  const initialState: AuthState = {
    isLoggedIn: true,
    user: {
        firstName: 'test',
        lastName: 'name',
        id: 1,
        role: 'ADMIN',
        token: 'ufsbjowe8hikweikc2ucibdkcnweo21'
    }
  };

  it('should select the auth state', () => {
    const result = selectAuthState.projector(initialState);

    expect(result).toBeDefined();
    expect(result.isLoggedIn).toBeDefined();
    expect(result.user).toBeDefined();
  });

  it('should select auth user', () => {
    const result = selectAuthUser.projector(initialState);

    expect(result).toBeDefined();
    expect(result?.firstName).toEqual('test');
  });

  it('should select logged-in state of a user', () => {
    const result = isLoggedIn.projector(initialState);

    expect(result).toBeDefined();
    expect(result).toBeTruthy();
  });
});
