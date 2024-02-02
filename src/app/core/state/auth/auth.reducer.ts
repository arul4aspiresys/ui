import { createReducer, on } from "@ngrx/store";
import * as AuthActions from "./auth.actions";
import { User } from "../../../models/user.model";

export interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
}

export const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
};

export const authReducer = createReducer(
    initialState,
    on(
        AuthActions.login,
        state => ({...state})
    ),
    on(
        AuthActions.loginSuccess,
        (state: AuthState, { user }) => ({ ...state, isLoggedIn: true, user })
    ),
    on(
        AuthActions.logout,
        (state: AuthState) => ({ ...state, isLoggedIn: false, user: null })
    )
);
