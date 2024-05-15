import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmazonesComponent } from './armazon.component';

describe('ArmazonesComponent', () => {
  let component: ArmazonesComponent;
  let fixture: ComponentFixture<ArmazonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArmazonesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArmazonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
