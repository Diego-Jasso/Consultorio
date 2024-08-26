import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LenteDeContactoFormComponent } from './lente-de-contacto-form.component';

describe('LenteDeContactoFormComponent', () => {
  let component: LenteDeContactoFormComponent;
  let fixture: ComponentFixture<LenteDeContactoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LenteDeContactoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LenteDeContactoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
