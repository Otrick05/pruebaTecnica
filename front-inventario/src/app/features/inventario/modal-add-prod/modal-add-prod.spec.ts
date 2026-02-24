import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddProd } from './modal-add-prod';

describe('ModalAddProd', () => {
  let component: ModalAddProd;
  let fixture: ComponentFixture<ModalAddProd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddProd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddProd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
