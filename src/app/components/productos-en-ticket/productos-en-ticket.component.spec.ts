import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosEnTicketComponent } from './productos-en-ticket.component';

describe('ProductosEnTicketComponent', () => {
  let component: ProductosEnTicketComponent;
  let fixture: ComponentFixture<ProductosEnTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosEnTicketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductosEnTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
