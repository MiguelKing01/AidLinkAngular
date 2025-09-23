import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPeticiones } from './ver-peticiones';

describe('VerPeticiones', () => {
  let component: VerPeticiones;
  let fixture: ComponentFixture<VerPeticiones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerPeticiones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerPeticiones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
