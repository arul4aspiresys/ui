import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavToolBarComponent } from './nav-tool-bar.component';
import { Store } from 'store-lib';
import { NavService } from '../../services/nav.service';
import { logout } from 'store-lib';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';

describe('NavToolBarComponent', () => {
  let component: NavToolBarComponent;
  let fixture: ComponentFixture<NavToolBarComponent>;
  let navService: jasmine.SpyObj<NavService>;
  let router: Router;
  let store: jasmine.SpyObj<Store>;

  beforeEach(() => {
    const navServiceSpy = jasmine.createSpyObj('NavService', ['toggleNav']);

    const storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);

    TestBed.configureTestingModule({
      declarations: [NavToolBarComponent],
      imports: [
        SharedModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: NavService, useValue: navServiceSpy },
        { provide: Store, useValue: storeSpy },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    navService = TestBed.inject(NavService) as jasmine.SpyObj<NavService>;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    store.select.and.returnValue(of({token: '2ejfkw87knsldou8idwnkowoef8jughjyuZSfvefrevadehrtu67n'}));
    
    fixture = TestBed.createComponent(NavToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should set logged in state and navigate to product list', () => {
    spyOn(router, 'navigateByUrl');
    component.ngOnInit();
    expect(component.isLoggedIn).toEqual(true);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/products/list');
  });

  it('should call toggle() method when button is clicked', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button[mat-icon-button]');
    button.click();
    expect(navService.toggleNav).toHaveBeenCalled();
  });

  it('should call logout() method when the logout button is clicked', () => {
    spyOn(router, 'navigateByUrl');
    
    component.isLoggedIn = true;
    fixture.detectChanges();

    const logoutButton = fixture.debugElement.nativeElement.querySelector('button[mat-fab][extended]');
    logoutButton.click();

    expect(store.dispatch).toHaveBeenCalledWith(logout());
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});

