import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualScoreComponent } from './actual-score.component';
import { beforeEach, describe, expect, it, vi } from 'vitest';

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
    const emitted: number[] = [];
    component.scoreEntry.subscribe((v) => emitted.push(v));
    component.scoreInput = null;

    component.enterScore();

    expect(emitted).toEqual([]);
    expect(component.score).toBe(0);
  });

  it('emits score entry and clears input', () => {
    const emitted: number[] = [];
    component.scoreEntry.subscribe((v) => emitted.push(v));
    component.scoreInput = 10;

    component.enterScore();
    component.scoreInput = 4;
    component.enterScore();

    expect(emitted).toEqual([10, 4]);
    expect(component.scoreInput).toBeNull();
  });

  it('computes score from entries input', () => {
    component.scoreEntries = [10, 4];

    expect(component.score).toBe(14);
  });

  it('resets score to zero after three consecutive zeroes', () => {
    component.scoreEntries = [5, 0, 0, 0];

    expect(component.score).toBe(0);
  });

  it('does not reset score after only one or two consecutive zeroes', () => {
    component.scoreEntries = [10, 0, 0];

    expect(component.score).toBe(10);
  });

  it('still requires three consecutive zeroes to reset after a previous reset', () => {
    // [5, 0,0,0] resets; then [7] rebuilds; [0,0] no reset; [0] second reset
    component.scoreEntries = [5, 0, 0, 0, 7, 0, 0];
    expect(component.score).toBe(7);

    component.scoreEntries = [5, 0, 0, 0, 7, 0, 0, 0];
    expect(component.score).toBe(0);
  });

  it('shows DBZ milestone for scores over 9000', () => {
    component.scoreEntries = [9001];
    fixture.detectChanges();

    const hostElement: HTMLElement = fixture.nativeElement;
    const scoreDisplay = hostElement.querySelector('.score-display');
    const milestoneChip = hostElement.querySelector('.milestone-chip');

    expect(scoreDisplay?.classList.contains('milestone-over-9000')).toBe(true);
    expect(milestoneChip?.textContent).toContain("IT'S OVER 9000!");
  });

  it('shows auto-win milestone at 10000 and above', () => {
    component.scoreEntries = [10000];
    fixture.detectChanges();

    const hostElement: HTMLElement = fixture.nativeElement;
    const scoreDisplay = hostElement.querySelector('.score-display');
    const milestoneChip = hostElement.querySelector('.milestone-chip');

    expect(component.hasAutoWin).toBe(true);
    expect(scoreDisplay?.classList.contains('milestone-autowin')).toBe(true);
    expect(milestoneChip?.textContent).toContain('Over 10000 - Auto Win!');
  });
});
