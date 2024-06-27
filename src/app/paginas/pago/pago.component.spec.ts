/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PagoComponent } from './pago.component';

describe('PagoComponent', () => {
  let component: PagoComponent;
  let fixture: ComponentFixture<PagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
