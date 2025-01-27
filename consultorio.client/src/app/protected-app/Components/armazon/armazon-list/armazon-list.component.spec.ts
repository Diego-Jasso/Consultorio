import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmazonListComponent } from './armazon-list.component';

describe('ArmazonListComponent', () => {
  let component: ArmazonListComponent;
  let fixture: ComponentFixture<ArmazonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArmazonListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArmazonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
