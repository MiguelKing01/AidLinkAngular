import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarPeticion } from './enviar-peticion';

describe('EnviarPeticion', () => {
  let component: EnviarPeticion;
  let fixture: ComponentFixture<EnviarPeticion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnviarPeticion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviarPeticion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
