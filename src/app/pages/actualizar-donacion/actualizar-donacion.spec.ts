import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarDonacion } from './actualizar-donacion';

describe('ActualizarDonacion', () => {
  let component: ActualizarDonacion;
  let fixture: ComponentFixture<ActualizarDonacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarDonacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarDonacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
