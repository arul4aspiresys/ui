import { createAction, props } from '@ngrx/store';
import { User } from 'shared-services';

export const login = createAction('[Auth] Login', props<{ username: string, password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{user: User}>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());
export const logout = createAction('[Auth] Logout');
