import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { calculateScore } from './calculate-score';

@Component({
  selector: 'pairodice-actual-score',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './actual-score.component.html',
  styleUrls: ['./actual-score.component.css'],
})
export class ActualScoreComponent {
  score = 0;
  scoreInput: number | null = null;
  readonly scoreEntries: number[] = [];

  enterScore(): void {
    if (this.scoreInput === null || Number.isNaN(this.scoreInput)) {
      return;
    }

    this.scoreEntries.push(this.scoreInput);
    this.scoreInput = null;
    this.score = calculateScore(this.scoreEntries);
  }
}
