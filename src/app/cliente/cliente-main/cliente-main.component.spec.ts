import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteMainComponent } from './cliente-main.component';

describe('ClienteMainComponent', () => {
  let component: ClienteMainComponent;
  let fixture: ComponentFixture<ClienteMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
