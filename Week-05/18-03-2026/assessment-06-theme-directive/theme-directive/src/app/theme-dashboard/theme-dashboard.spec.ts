import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeDashboard } from './theme-dashboard';

describe('ThemeDashboard', () => {
  let component: ThemeDashboard;
  let fixture: ComponentFixture<ThemeDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
