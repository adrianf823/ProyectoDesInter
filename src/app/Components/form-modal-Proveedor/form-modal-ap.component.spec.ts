import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalAPComponentProveedor } from './form-modal-ap.component';

describe('FormModalAPComponent', () => {
  let component: FormModalAPComponentProveedor;
  let fixture: ComponentFixture<FormModalAPComponentProveedor>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormModalAPComponentProveedor ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModalAPComponentProveedor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
