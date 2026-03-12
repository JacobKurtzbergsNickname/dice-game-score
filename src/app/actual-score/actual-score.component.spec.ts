import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualScoreComponent } from './actual-score.component';

describe('ActualScoreComponent', () => {
  let component: ActualScoreComponent;
  let fixture: ComponentFixture<ActualScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualScoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActualScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ignores empty inputs', () => {
    component.scoreInput = null;

    component.enterScore();

    expect(component.scoreEntries).toEqual([]);
    expect(component.score).toBe(0);
  });

  it('adds score entries and updates total', () => {
    component.scoreInput = 10;
    component.enterScore();
    component.scoreInput = 4;
    component.enterScore();

    expect(component.scoreEntries).toEqual([10, 4]);
    expect(component.score).toBe(14);
    expect(component.scoreInput).toBeNull();
  });
});
