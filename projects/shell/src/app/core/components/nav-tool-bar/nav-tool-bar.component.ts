  import { Component, Input, OnInit } from '@angular/core';
  import { NavService } from '../../services/nav.service';
  import { Store } from 'store-lib';
  import { logout, selectAuthUser } from 'store-lib';
  import { Router } from '@angular/router';
  
  @Component({
    selector: 'app-nav-tool-bar',
    templateUrl: './nav-tool-bar.component.html',
    styleUrl: './nav-tool-bar.component.css'
  })
  export class NavToolBarComponent implements OnInit{

    @Input('appName') _appName!: string;

    declare isLoggedIn: boolean;

    constructor(
      private navSVC: NavService,
      private store: Store,
      private router: Router,
    ){}

    ngOnInit(): void {
      this.store.select(selectAuthUser).subscribe(user => {
        this.isLoggedIn = !!user?.token;
        if(this.isLoggedIn) {
          this.router.navigateByUrl('/products/list');
        }
      });
    }

    toggle() {
      this.navSVC.toggleNav();
    }

    logout() {
      this.store.dispatch(logout());
      this.router.navigateByUrl('/login');
    }
  }
