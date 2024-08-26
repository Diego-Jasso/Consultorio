import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LenteDeContactoComponent } from './lente-de-contacto.component';

describe('LenteDeContactoComponent', () => {
  let component: LenteDeContactoComponent;
  let fixture: ComponentFixture<LenteDeContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LenteDeContactoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LenteDeContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
