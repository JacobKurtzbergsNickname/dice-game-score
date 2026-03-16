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

  it('shows DBZ milestone for scores over 9000', () => {
    component.score = 9001;
    fixture.detectChanges();

    const hostElement: HTMLElement = fixture.nativeElement;
    const scoreDisplay = hostElement.querySelector('.score-display');
    const milestoneChip = hostElement.querySelector('.milestone-chip');

    expect(scoreDisplay?.classList.contains('milestone-over-9000')).toBe(true);
    expect(milestoneChip?.textContent).toContain("IT'S OVER 9000!");
  });

  it('shows auto-win milestone at 10000 and above', () => {
    component.score = 10000;
    fixture.detectChanges();

    const hostElement: HTMLElement = fixture.nativeElement;
    const scoreDisplay = hostElement.querySelector('.score-display');
    const milestoneChip = hostElement.querySelector('.milestone-chip');

    expect(component.hasAutoWin).toBe(true);
    expect(scoreDisplay?.classList.contains('milestone-autowin')).toBe(true);
    expect(milestoneChip?.textContent).toContain('Over 10000 - Auto Win!');
  });
});
