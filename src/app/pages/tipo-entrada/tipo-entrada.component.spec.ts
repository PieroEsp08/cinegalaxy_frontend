import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEntradaComponent } from './tipo-entrada.component';

describe('TipoEntradaComponent', () => {
  let component: TipoEntradaComponent;
  let fixture: ComponentFixture<TipoEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoEntradaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
