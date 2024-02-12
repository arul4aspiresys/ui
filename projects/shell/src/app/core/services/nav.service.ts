import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class NavService {
    declare public appDrawer: any;

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