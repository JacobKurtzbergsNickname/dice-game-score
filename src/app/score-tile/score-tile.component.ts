import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NameInputComponent } from '../name-input/name-input.component';
import { ActualScoreComponent } from '../actual-score/actual-score.component';

@Component({
  selector: 'pairodice-score-tile',
  standalone: true,
  imports: [MatCardModule, NameInputComponent, ActualScoreComponent],
  templateUrl: './score-tile.component.html',
  styleUrl: './score-tile.component.css',
})
export class ScoreTileComponent {
  readonly playerIndex = input.required<number>();
}
