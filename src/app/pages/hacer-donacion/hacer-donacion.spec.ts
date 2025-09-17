import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HacerDonacion } from './hacer-donacion';

describe('HacerDonacion', () => {
  let component: HacerDonacion;
  let fixture: ComponentFixture<HacerDonacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HacerDonacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HacerDonacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
