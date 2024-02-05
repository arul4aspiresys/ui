  import { Component, Input, OnInit } from '@angular/core';
  import { NavService } from '../../services/nav.service';
  import { Store } from '@ngrx/store';
  import { selectAuthUser } from '../../state/auth/auth.selector';
  import { Router } from '@angular/router';
  import * as AuthActions from '../../state/auth/auth.actions';

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
      this.store.dispatch(AuthActions.logout());
      this.router.navigateByUrl('/login');
    }
  }
