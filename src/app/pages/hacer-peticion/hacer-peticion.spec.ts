import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HacerPeticion } from './hacer-peticion';

describe('HacerPeticion', () => {
  let component: HacerPeticion;
  let fixture: ComponentFixture<HacerPeticion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HacerPeticion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HacerPeticion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
