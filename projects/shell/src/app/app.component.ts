import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { menuConfig } from './config/menu.config';
import { environment } from '../environments/environment';
import { NavService } from './core/services/nav.service';
import { Store } from 'store-lib';
import { selectAuthUser } from 'store-lib';

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
  declare user: any;
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
    this.store.select(selectAuthUser).subscribe(user => {      
      if (user) {        
        this.user = user;
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
