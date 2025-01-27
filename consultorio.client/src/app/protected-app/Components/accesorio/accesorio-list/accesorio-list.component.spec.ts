import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesorioListComponent } from './accesorio-list.component';

describe('AccesorioListComponent', () => {
  let component: AccesorioListComponent;
  let fixture: ComponentFixture<AccesorioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccesorioListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccesorioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
