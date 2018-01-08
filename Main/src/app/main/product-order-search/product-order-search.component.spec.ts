import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOrderSearchComponent } from './product-order-search.component';

describe('ProductOrderSearchComponent', () => {
  let component: ProductOrderSearchComponent;
  let fixture: ComponentFixture<ProductOrderSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOrderSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOrderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
