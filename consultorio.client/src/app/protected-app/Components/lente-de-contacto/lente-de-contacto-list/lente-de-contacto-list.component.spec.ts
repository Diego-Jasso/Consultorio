import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LenteDeContactoListComponent } from './lente-de-contacto-list.component';

describe('LenteDeContactoListComponent', () => {
  let component: LenteDeContactoListComponent;
  let fixture: ComponentFixture<LenteDeContactoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LenteDeContactoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LenteDeContactoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
