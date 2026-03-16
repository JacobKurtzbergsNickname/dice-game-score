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

  it('resets score to zero after three consecutive zeroes', () => {
    component.scoreInput = 5;
    component.enterScore();
    component.scoreInput = 0;
    component.enterScore();
    component.scoreInput = 0;
    component.enterScore();
    component.scoreInput = 0;
    component.enterScore();

    expect(component.score).toBe(0);
  });

  it('does not reset score after only one or two consecutive zeroes', () => {
    component.scoreInput = 10;
    component.enterScore();
    component.scoreInput = 0;
    component.enterScore();
    component.scoreInput = 0;
    component.enterScore();

    expect(component.score).toBe(10);
  });

  it('still requires three consecutive zeroes to reset after a previous reset', () => {
    // first reset
    component.scoreInput = 5;
    component.enterScore();
    component.scoreInput = 0;
    component.enterScore();
    component.scoreInput = 0;
    component.enterScore();
    component.scoreInput = 0;
    component.enterScore();

    // rebuild score
    component.scoreInput = 7;
    component.enterScore();

    // one zero: no reset
    component.scoreInput = 0;
    component.enterScore();
    expect(component.score).toBe(7);

    // second zero: no reset
    component.scoreInput = 0;
    component.enterScore();
    expect(component.score).toBe(7);

    // third zero: second reset
    component.scoreInput = 0;
    component.enterScore();
    expect(component.score).toBe(0);
  });
});
