import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User, UserLogin } from "./models/user.model";
import { LibConfig, LibConfigService } from "./shared-services.module";

@Injectable({
    providedIn: "root"
})

export class AuthService {

    private _loggedIn$ = new BehaviorSubject<boolean>(false);

    public loggedIn$ = this._loggedIn$.asObservable();

    constructor(
        private http: HttpClient,
        @Inject(LibConfigService) private libConfig: LibConfig,
    ){}

    logOut() {
        this._loggedIn$.next(false);
    }

    logIn (payload: UserLogin) {
        return this.http.post<User>(this.libConfig.apiUrl + '/authenticate', payload);
    }
}