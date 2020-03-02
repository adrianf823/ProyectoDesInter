import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalAPComponentCliente } from './form-modal-ap.component';

describe('FormModalAPComponent', () => {
  let component: FormModalAPComponentCliente;
  let fixture: ComponentFixture<FormModalAPComponentCliente>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormModalAPComponentCliente ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModalAPComponentCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
