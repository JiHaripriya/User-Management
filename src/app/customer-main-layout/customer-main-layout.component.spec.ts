import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMainLayoutComponent } from './customer-main-layout.component';

describe('CustomerMainLayoutComponent', () => {
  let component: CustomerMainLayoutComponent;
  let fixture: ComponentFixture<CustomerMainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerMainLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
