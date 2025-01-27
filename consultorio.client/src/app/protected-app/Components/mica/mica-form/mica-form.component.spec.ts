import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicaFormComponent } from './mica-form.component';

describe('MicaFormComponent', () => {
  let component: MicaFormComponent;
  let fixture: ComponentFixture<MicaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MicaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MicaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
