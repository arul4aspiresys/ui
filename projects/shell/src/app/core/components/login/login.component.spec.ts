import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Store, login } from 'store-lib';
import { SharedModule } from '../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let el: DebugElement;
  let fixture: ComponentFixture<LoginComponent>;
  let store: jasmine.SpyObj<Store>;

  const credentials = {
    username: 'admin',
    password: 'admin'
  };

  beforeEach(async () => {

    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule, 
        SharedModule, 
        NgxPermissionsModule, 
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: Store,
          useValue: storeSpy
        }
      ]
    })
    .compileComponents();
    
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should initialize the login form with empty values and disabled login button', () => {
    component.ngOnInit();
    expect(component.loginForm.get('username')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
    expect(getElement(el, 'button.mat-primary').properties['disabled']).toEqual(true);
  });

  it('should dispatch login action on login()', () => {
    component.loginForm.setValue({...credentials});
    component.login();
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledOnceWith(login({...credentials}));
  });
});

const getElement = (el: DebugElement, selector: string) => {
  return el.query(By.css(selector));
}