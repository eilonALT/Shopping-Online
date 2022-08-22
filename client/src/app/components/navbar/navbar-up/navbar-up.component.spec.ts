import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarUpComponent } from './navbar-up.component';

describe('NavbarUpComponent', () => {
  let component: NavbarUpComponent;
  let fixture: ComponentFixture<NavbarUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
