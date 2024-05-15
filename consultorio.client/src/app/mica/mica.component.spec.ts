import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicasComponent } from './mica.component';

describe('MicasComponent', () => {
  let component: MicasComponent;
  let fixture: ComponentFixture<MicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MicasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
