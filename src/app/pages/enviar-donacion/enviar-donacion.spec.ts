import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarDonacion } from './enviar-donacion';

describe('EnviarDonacion', () => {
  let component: EnviarDonacion;
  let fixture: ComponentFixture<EnviarDonacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnviarDonacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviarDonacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
