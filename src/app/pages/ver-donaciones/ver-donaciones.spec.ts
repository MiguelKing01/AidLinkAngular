import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDonaciones } from './ver-donaciones';

describe('VerDonaciones', () => {
  let component: VerDonaciones;
  let fixture: ComponentFixture<VerDonaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerDonaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDonaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
