import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoLenteFormComponent } from './nuevo-lente-form.component';

describe('NuevoLenteFormComponent', () => {
  let component: NuevoLenteFormComponent;
  let fixture: ComponentFixture<NuevoLenteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NuevoLenteFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevoLenteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
