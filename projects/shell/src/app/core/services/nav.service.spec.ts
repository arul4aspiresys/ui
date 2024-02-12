import { TestBed } from "@angular/core/testing";
import { NavService } from "./nav.service";

describe('NavService', () => {
  let navService: NavService;
  let appDrawerSpy = jasmine.createSpyObj('appDrawer', ['open', 'close', 'toggle']);
    
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NavService,
      ]
    });
    navService = TestBed.inject(NavService);
    navService.appDrawer = appDrawerSpy;
  });

  it('should open navigation', () => {
    navService.openNav();
    expect(navService.appDrawer.open).toHaveBeenCalled();
  });

  it('should close navigation', () => {
    navService.closeNav();
    expect(navService.appDrawer.close).toHaveBeenCalled();
  });

  it('should toggle navigation', () => {
    navService.toggleNav();
    expect(navService.appDrawer.toggle).toHaveBeenCalled();
  });
});
