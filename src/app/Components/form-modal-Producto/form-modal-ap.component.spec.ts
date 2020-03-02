import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalAPComponentProducto } from './form-modal-ap.component';

describe('FormModalAPComponent', () => {
  let component: FormModalAPComponentProducto;
  let fixture: ComponentFixture<FormModalAPComponentProducto>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormModalAPComponentProducto ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModalAPComponentProducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
