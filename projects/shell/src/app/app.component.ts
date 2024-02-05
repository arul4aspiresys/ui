import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { menuConfig } from './config/menu.config';
import { environment } from '../environments/environment';
import { NavService } from './core/services/nav.service';
import { Store } from '@ngrx/store';
import { selectAuthUser } from './core/state/auth/auth.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  declare mobileQuery: MediaQueryList;
  declare private _mobileQueryListener:() => void;
  appName = environment.appName;
  navMenu = menuConfig;
  @ViewChild('appDrawer') appDrawer!: ElementRef;

  constructor( 
    changeDetector: ChangeDetectorRef, 
    media: MediaMatcher,
    private permissionsSVC: NgxPermissionsService,
    private navSVC: NavService,
    private store: Store,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetector.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    console.log(this.mobileQuery.matches);
    this.permissionsSVC.permissions$.subscribe(p => console.log(p));
    this.store.select(selectAuthUser).subscribe(user => {      
      if (user) {        
        this.permissionsSVC.flushPermissions();
        this.permissionsSVC.addPermission([user.role]);
      } else {        
        this.permissionsSVC.flushPermissions();
        this.permissionsSVC.addPermission(['USER']);
      }
    });
  }

  ngAfterViewInit(): void {
    this.navSVC.appDrawer = this.appDrawer;
  }
}