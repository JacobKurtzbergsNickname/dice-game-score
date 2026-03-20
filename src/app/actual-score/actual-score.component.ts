import { Component, Input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import {
  calculateScore,
  getMilestoneLabel,
  getScoreMilestone,
  isAutoWin,
  type ScoreMilestone,
} from './calculate-score';

@Component({
  selector: 'pairodice-actual-score',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './actual-score.component.html',
  styleUrls: ['./actual-score.component.css'],
})
export class ActualScoreComponent {
  @Input() scoreEntries: number[] = [];
  scoreInput: number | null = null;
  readonly scoreEntry = output<number>();

  get score(): number {
    return calculateScore(this.scoreEntries);
  }

  get scoreMilestone(): ScoreMilestone {
    return getScoreMilestone(this.score);
  }

  get milestoneLabel(): string {
    return getMilestoneLabel(this.score);
  }

  get hasAutoWin(): boolean {
    return isAutoWin(this.score);
  }

  enterScore(): void {
    if (this.scoreInput === null || Number.isNaN(this.scoreInput)) {
      return;
    }

    this.scoreEntry.emit(this.scoreInput);
    this.scoreInput = null;
  }
}
