import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { ScoreTileComponent } from '../score-tile/score-tile.component';

@Component({
  selector: 'pairodice-score-board',
  standalone: true,
  imports: [RouterLink, MatButtonModule, ScoreTileComponent],
  templateUrl: './score-board.component.html',
  styleUrl: './score-board.component.css',
})
export class ScoreBoardComponent {
  readonly players = signal<number[]>([1]);

  addPlayer(): void {
    const nextId = this.players().length + 1;
    this.players.update((currentPlayers) => [...currentPlayers, nextId]);
  }
}
