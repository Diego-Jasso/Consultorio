import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicaCotizacionFormComponent } from './mica-cotizacion-form.component';

describe('MicaCotizacionFormComponent', () => {
  let component: MicaCotizacionFormComponent;
  let fixture: ComponentFixture<MicaCotizacionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MicaCotizacionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MicaCotizacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
