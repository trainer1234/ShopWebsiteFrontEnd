import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPropertyManagerComponent } from './product-property-manager.component';

describe('ProductPropertyManagerComponent', () => {
  let component: ProductPropertyManagerComponent;
  let fixture: ComponentFixture<ProductPropertyManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPropertyManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPropertyManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
