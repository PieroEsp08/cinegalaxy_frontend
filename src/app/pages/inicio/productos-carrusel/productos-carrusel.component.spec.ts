import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosCarruselComponent } from './productos-carrusel.component';

describe('ProductosCarruselComponent', () => {
  let component: ProductosCarruselComponent;
  let fixture: ComponentFixture<ProductosCarruselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosCarruselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductosCarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
