import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoMainComponent } from './producto-main.component';

describe('ProductoMainComponent', () => {
  let component: ProductoMainComponent;
  let fixture: ComponentFixture<ProductoMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
