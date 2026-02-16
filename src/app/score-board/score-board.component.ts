import { Component } from '@angular/core';

import { ScoreTileComponent } from '../score-tile/score-tile.component';

@Component({
  selector: 'pairodice-score-board',
  standalone: true,
  imports: [ScoreTileComponent],
  templateUrl: './score-board.component.html',
  styleUrl: './score-board.component.css',
})
export class ScoreBoardComponent {
  readonly numberOfTiles = 4;
  readonly tiles = Array.from({ length: this.numberOfTiles }, (_, index) => index);
}
