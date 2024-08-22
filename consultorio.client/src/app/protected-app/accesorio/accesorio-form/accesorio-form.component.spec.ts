import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesorioFormComponent } from './accesorio-form.component';

describe('AccesorioFormComponent', () => {
  let component: AccesorioFormComponent;
  let fixture: ComponentFixture<AccesorioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccesorioFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccesorioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
