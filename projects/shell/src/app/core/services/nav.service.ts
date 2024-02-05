import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class NavService {
    declare public appDrawer: any;
    public currentURL$ = new BehaviorSubject<string>('');

    constructor(
        private router: Router
    ){
        this.router.events.subscribe((event) => {
            if(event instanceof NavigationEnd) {
                this.currentURL$.next(event.urlAfterRedirects);
                console.log('NavService - event.urlAfterRedirects = ', event.urlAfterRedirects);
            }
        });
    }

    openNav() {
        this.appDrawer.open();
    }

    closeNav() {
        this.appDrawer.close();
    }

    toggleNav() {
        this.appDrawer.toggle();
    }
}