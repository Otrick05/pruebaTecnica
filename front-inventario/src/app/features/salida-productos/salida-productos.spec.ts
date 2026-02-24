import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidaProductos } from './salida-productos';

describe('SalidaProductos', () => {
  let component: SalidaProductos;
  let fixture: ComponentFixture<SalidaProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalidaProductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalidaProductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
