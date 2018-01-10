import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceledOrderManagerComponent } from './canceled-order-manager.component';

describe('CanceledOrderManagerComponent', () => {
  let component: CanceledOrderManagerComponent;
  let fixture: ComponentFixture<CanceledOrderManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanceledOrderManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanceledOrderManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
