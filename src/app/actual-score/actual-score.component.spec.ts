import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualScoreComponent } from './actual-score.component';

describe('ActualScoreComponent', () => {
  let component: ActualScoreComponent;
  let fixture: ComponentFixture<ActualScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualScoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
