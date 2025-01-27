import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicaListComponent } from './mica-list.component';

describe('MicaListComponent', () => {
  let component: MicaListComponent;
  let fixture: ComponentFixture<MicaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MicaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MicaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
