import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalAPComponentPresupProduct } from './form-modal-ap.component';

describe('FormModalAPComponent', () => {
  let component: FormModalAPComponentPresupProduct;
  let fixture: ComponentFixture<FormModalAPComponentPresupProduct>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormModalAPComponentPresupProduct ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModalAPComponentPresupProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
