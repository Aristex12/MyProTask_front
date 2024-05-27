import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUsersPmComponent } from './project-users-pm.component';

describe('ProjectUsersPmComponent', () => {
  let component: ProjectUsersPmComponent;
  let fixture: ComponentFixture<ProjectUsersPmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectUsersPmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectUsersPmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
