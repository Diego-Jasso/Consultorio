import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmazonFormComponent } from './armazon-form.component';

describe('ArmazonFormComponent', () => {
  let component: ArmazonFormComponent;
  let fixture: ComponentFixture<ArmazonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArmazonFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArmazonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
