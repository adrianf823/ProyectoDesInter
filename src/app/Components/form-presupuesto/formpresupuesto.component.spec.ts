import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormpresupuestoComponent } from './formpresupuesto.component';

describe('FormpresupuestoComponent', () => {
  let component: FormpresupuestoComponent;
  let fixture: ComponentFixture<FormpresupuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormpresupuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormpresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
