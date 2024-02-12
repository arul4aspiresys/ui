import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { NavService } from './core/services/nav.service';
import { Store } from 'store-lib';
import { User } from './models/user.model';
import { of } from 'rxjs';
import { SharedModule } from './shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NavToolBarComponent } from './core/components/nav-tool-bar/nav-tool-bar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MenuItemComponent } from './core/components/menu-item/menu-item.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let permissionService: NgxPermissionsService;
  let store: jasmine.SpyObj<Store>;

  const user1: User = {
    firstName: 'user',
    id: 1,
    lastName: '1',
    role: 'ADMIN',
    token: 'yu87bsfniw8uhoioqjqdwslu2o3klfnwicnbtyu57tq3gefwdw'
  };

  beforeEach(() => {

    const storeSpy = jasmine.createSpyObj('Store', ['select']);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavToolBarComponent,
        MenuItemComponent,
      ],
      imports: [
        RouterTestingModule,
        SharedModule,
        NgxPermissionsModule.forRoot(),
        NoopAnimationsModule,
      ],
      providers: [
        MediaMatcher,
        ChangeDetectorRef,
        {
          provider: NgxPermissionsService,
          useValue: permissionService,
        },
        NavService,
        {
          provide: Store, useValue: storeSpy
        },
      ],
    });

    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    store.select.and.returnValue(of(user1));

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should set ADMIN Role for "admin" users', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.user).toEqual(user1);
  });
});
