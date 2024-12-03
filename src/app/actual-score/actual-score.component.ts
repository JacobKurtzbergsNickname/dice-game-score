import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { calculateScore } from './calculate-score';

@Component({
  selector: 'pairodice-actual-score',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './actual-score.component.html',
  styleUrls: ['./actual-score.component.css']  // Corrected from 'styleUrl' to 'styleUrls'
})
export class ActualScoreComponent {

  score = 0;
  scoreInput: number | null = null;
  scoreEntries: number[] = [];  // Array of scores

  enterScore(): void {
    if (this.scoreInput === null) {
      alert("Ia hobt's nix ei'gebn. :)");
      return;
    }

    this.scoreEntries.push(this.scoreInput);
    this.scoreInput = null;
    this.score = calculateScore(this.scoreEntries);
  }
}
