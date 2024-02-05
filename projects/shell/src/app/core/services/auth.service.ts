import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../../environments/environment";
import { User, UserLogin } from "../../models/user.model";

@Injectable({
    providedIn: "root"
})

export class AuthService {
    private _loggedIn$ = new BehaviorSubject<boolean>(false);

    public loggedIn$ = this._loggedIn$.asObservable();

    constructor(
        private http: HttpClient
    ){}

    logOut() {
        this._loggedIn$.next(false);
    }

    logIn (payload: UserLogin) {
        return this.http.post<User>(environment.apiURL + '/authenticate', payload);
    }
}