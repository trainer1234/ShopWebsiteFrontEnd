import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnprocessedOrderManagerComponent } from './unprocessed-order-manager.component';

describe('UnprocessedOrderManagerComponent', () => {
  let component: UnprocessedOrderManagerComponent;
  let fixture: ComponentFixture<UnprocessedOrderManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnprocessedOrderManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnprocessedOrderManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
