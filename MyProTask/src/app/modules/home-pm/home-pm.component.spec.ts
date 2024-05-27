import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePmComponent } from './home-pm.component';

describe('HomePmComponent', () => {
  let component: HomePmComponent;
  let fixture: ComponentFixture<HomePmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
