import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuItemComponent } from './menu-item.component';
import { NavItem } from '../../../models/nav-item.model';
import { NavService } from '../../services/nav.service';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MenuItemComponent', () => {
  let component: MenuItemComponent;
  let fixture: ComponentFixture<MenuItemComponent>;
  let navService: jasmine.SpyObj<NavService>;
  let router: Router;

  const mockNavItem1: NavItem = {
      title: 'Customer',
      iconName: 'person',
      permissions: ['ADMIN'],
      children: [
          {
              title: 'Create',
              iconName: 'add_circle',
              permissions: ['ADMIN'],
              route: 'mock-url-1'
          },
          {
              title: 'List',
              iconName: 'list',
              permissions: ['ADMIN'],
              route: 'mock-url-2'
          }
      ]
  };

  const mockNavItem2: NavItem = {
    title: 'Create',
    iconName: 'add_circle',
    permissions: ['ADMIN'],
    route: 'mock-url-1'
  }

  beforeEach(async () => {
    const navServiceSpy = jasmine.createSpyObj('NavService', ['closeNav']);

    await TestBed.configureTestingModule({
      declarations: [MenuItemComponent],
      imports: [
        RouterTestingModule,
        SharedModule, 
        NgxPermissionsModule.forRoot(), 
        NoopAnimationsModule,
      ],
      providers: [
        { provide: NavService, useValue: navServiceSpy },
      ],
    }).compileComponents();
    
    navService = TestBed.inject(NavService) as jasmine.SpyObj<NavService>;
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;
    
    component._item = mockNavItem1;
    fixture.detectChanges();
  });

  it('should handle item click with children', () => {
    spyOn(router, 'navigateByUrl');
    component.onItemClick(mockNavItem1);
    expect(component.expanded).toBeTruthy();
  });

  it('should handle item click without children', () => {
    spyOn(router, 'navigateByUrl');
    component.onItemClick(mockNavItem2);
    expect(router.navigateByUrl).toHaveBeenCalledWith('mock-url-1');
  });
});
