import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ScoreBoardComponent } from './score-board.component';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('ScoreBoardComponent', () => {
  let component: ScoreBoardComponent;
  let fixture: ComponentFixture<ScoreBoardComponent>;

  beforeEach(async () => {
    vi.useFakeTimers();
    HTMLElement.prototype.scrollTo = vi.fn();

    await TestBed.configureTestingModule({
      imports: [ScoreBoardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts with one player', () => {
    expect(component.players()).toHaveLength(1);
    expect(component.players()[0]).toMatchObject({ id: 1, name: '', scoreEntries: [] });
  });

  it('adds a new player without affecting existing ones', () => {
    component.updatePlayerName(1, 'Alice');
    component.addScoreEntry(1, 10);
    component.addPlayer();
    vi.runAllTimers();

    expect(component.players()).toHaveLength(2);
    expect(component.players()[0]).toMatchObject({ name: 'Alice', scoreEntries: [10] });
    expect(component.players()[1]).toMatchObject({ id: 2, name: '', scoreEntries: [] });
  });

  it('scrolls to the new player slide after addPlayer()', () => {
    const scrollSpy = vi.spyOn(component, 'scrollToSlide');
    component.addPlayer();
    vi.runAllTimers();

    expect(scrollSpy).toHaveBeenCalledWith(1);
  });

  it('updates the name of a specific player', () => {
    component.addPlayer();
    vi.runAllTimers();
    component.updatePlayerName(1, 'Alice');
    component.updatePlayerName(2, 'Bob');

    expect(component.players()[0].name).toBe('Alice');
    expect(component.players()[1].name).toBe('Bob');
  });

  it('adds a score entry to a specific player', () => {
    component.addPlayer();
    vi.runAllTimers();
    component.addScoreEntry(1, 5);
    component.addScoreEntry(2, 10);

    expect(component.players()[0].scoreEntries).toEqual([5]);
    expect(component.players()[1].scoreEntries).toEqual([10]);
  });

  it('computes the score correctly via playerScore()', () => {
    component.addScoreEntry(1, 10);
    component.addScoreEntry(1, 5);

    expect(component.playerScore(component.players()[0])).toBe(15);
  });

  it('resets score after three consecutive zeroes', () => {
    component.addScoreEntry(1, 10);
    component.addScoreEntry(1, 0);
    component.addScoreEntry(1, 0);
    component.addScoreEntry(1, 0);

    expect(component.playerScore(component.players()[0])).toBe(0);
  });
});
