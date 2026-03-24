import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalAppointment } from './hospital-appointment';

describe('HospitalAppointment', () => {
  let component: HospitalAppointment;
  let fixture: ComponentFixture<HospitalAppointment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalAppointment],
    }).compileComponents();

    fixture = TestBed.createComponent(HospitalAppointment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
