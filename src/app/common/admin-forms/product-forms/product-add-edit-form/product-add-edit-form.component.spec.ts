import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddEditFormComponent } from './product-add-edit-form.component';

describe('ProductAddEditFormComponent', () => {
  let component: ProductAddEditFormComponent;
  let fixture: ComponentFixture<ProductAddEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAddEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAddEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
