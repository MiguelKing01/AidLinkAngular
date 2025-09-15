import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirVacante } from './subir-vacante';

describe('SubirVacante', () => {
  let component: SubirVacante;
  let fixture: ComponentFixture<SubirVacante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirVacante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirVacante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
